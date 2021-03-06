<template>
  <div>
    <slot name="listlapak">
      <v-toolbar flat color="white">
        <v-toolbar-title>List Lapak</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" @click="navigateTo({
            name: 'TambahLapak'
          })" color="primary" dark class="mb-2">New Item</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="lapak"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.judul_post }}</td>
          <td class="text-xs-center">{{ props.item.deskripsi_umum }}</td>
          <td class="text-xs-center">{{ props.item.perbulan }}</td>
          <td class="text-xs-center">{{ props.item.Penyedium.nama_penyedia }}</td>
          <td class="text-xs-center">{{ props.item.Lokasi.kota }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="update_lapak({
                name: 'editlapak',
                params: {
                  lapakId: props.item.id
                }
              })">
              edit
            </v-icon>
            <v-icon
              small
              @click="delete_lapak(props)">
              delete
            </v-icon>
          </td>
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </slot>
  </div>
</template>

<script>
import LapakController from '@/services/LapakController'

export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Judul post',
        align: 'center',
        sortable: false,
        value: 'name'
      },
      { text: 'Deskripsi Umum', value: 'lapak' },
      { text: 'Harga per bulan', value: 'fat' },
      { text: 'Nama Penyedia', value: 'carbs' },
      { text: 'Kota', value: 'protein' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    lapak: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
    this.getLapak()
  },

  methods: {
    navigateTo (route) {
      return this.$router.push(route)
    },
    delete_lapak (props) {
      LapakController.delete(props.item.id)
        .then((resp) => {
          this.$swal('Deleted', 'Lapak has been deleted.', 'success')
            .then(() => {
              this.$router.push('list-lapak')
            })
        })
    },
    update_lapak (route) {
      this.$router.push(route)
    },
    getLapak () {
      try {
        LapakController.index()
          .then((resp) => {
            this.lapak = resp.data
            console.log(resp.data)
          })
      } catch (e) {
        console.log(e)
      }
    },
    initialize () {
      this.lapak = [
        {
          lapak: this.lapak.judul_post
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

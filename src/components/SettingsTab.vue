<template lang="html">
     <div id="settings-tab" class="col-lg-5 col-md-12">
           <div class="card text-white bg-primary mb-4">
                <div class="card-header"><h5>Settings</h5></div>
                <div class="card-body">
                     <table class="table table-hover">
                       <thead>
                         <tr>
                           <th scope="col">Enabled</th>
                           <th scope="col">Treatment</th>
                           <th scope="col">Treatment Type</th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr v-for="(setting, index) in settingsTab" :key="index">
                              <th scope="row">

                                   <div class="form-check">
                                        <input
                                             class="form-check-input"
                                             type="checkbox"
                                             :id="setting.id"
                                             v-model="setting.status"
                                             :setting.indeterminate.sync="setting.indeterminate"
                                             @change="displayStatus(setting)">
                                   </div>
                              </th>
                              <td>{{ setting.name | ucFirst}}</td>
                              <td>{{ setting.customType | ucFirst}}</td>
                         </tr>
                       </tbody>
                     </table>
                     <!-- <TreatmentForm></TreatmentForm> -->
                </div>
           </div>
     </div>
</template>

<script>

import TreatmentForm from './addTreatmentForm'

export default {
     name: 'settings-tab',
     props: {
        isLoading: {
          type: String,
          default () {
            return ''
          }
        }
     },
     data() {
          return {
               childData: false,
               selected: [],
               settingsTab: [],
               activeTab: null,
          }
     },
     methods: {
          displayStatus(item, event) {

               this.$emit('displayStatus', this.childData = true);
               let updateItem = {
                    id: item.id,
                    customType: item.customType,
                    name: item.name,
                    status: item.status
                    //status: item.status != false ? true : false
               }

               this.$eventHub.$emit('displayStatus', updateItem);
               this.$http.put('https://healint-vue-exam.firebaseio.com/settings_tabs/' + item.id + '.json', updateItem)
               .then((response) => {
                    this.$emit('displayStatus', this.childData = false);
                    //location.reload();
               })
               .catch((error) => { console.log('Error: ', error)});
          },
          fetchData() {
               this.$http.get('https://healint-vue-exam.firebaseio.com/settings_tabs.json')
               .then((data) => { return data.json(); })
               .then((data) => {
                    var tmpItems = [];
                    for(let key in data) {
                         data[key].id = key;
                         data[key].indeterminate = true;

                         tmpItems.push(data[key]);
                    }

                    this.settingsTab = tmpItems;
               })
               .catch((error) => { console.log('Error: ', error)});
          }
     },
     components: {
          TreatmentForm
     },
     created() {
          this.fetchData();
     },
     filters: {
          ucFirst(value) {

               if (!value) {
                    return;
               }

               var splitStr = value.toLowerCase().split(' ');
               for (var i = 0; i < splitStr.length; i++) {
                    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
               }

               return splitStr.join(' ');
          }
     }
}
</script>

<style lang="css">
</style>

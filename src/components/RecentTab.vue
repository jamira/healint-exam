<template lang="html">
     <div id="recent-tab" class="col-lg-7 col-sm-12">
          <div v-for="response in data" :key="response.id" :id="response.id" class="card text-white bg-primary mb-4">
               <div class="card-header">
                    <h6 class="float-left">{{ response.date | dateFormat}}</h6>
                    <span @click="showSettings(response)" class="float-right">
                         <i class="fa fa-lg" :class="response.isShowSettings ? 'fa-minus-circle' : 'fa-plus-circle'"></i>
                    </span>
               </div>
               <div class="card-body">
                    <div class="card-treatment">
                         <div class="treatment-for-today" v-show="response.isShowTreatment">
                              <div class="row">
                                   <div class="col-sm-3">
                                        <div class="mood text-center pb-3">
                                             <span v-if="response.dayType.length"
                                                  class="fa fa-7x"
                                             :class="getMoodClass(response.dayType)"></span>
                                             <span v-else class="fa fa-question-circle fa-7x"></span>
                                        </div>
                                   </div>
                                   <div class="col-sm-9">
                                        <div v-if="response.dayExists == true" class="response">
                                             <h5 class="response-date mb-2">{{ response.date | dateFormat }}</h5>
                                             <span class="btn btn-sm btn-block"
                                                  :class="getLevelClass(response.activeLevel)">
                                                  <i class="fa fa-bolt"></i> {{ response.activeLevel | uppercase}}</span>
                                             <div class="treatment-tags mt-2 pb-3">
                                                  <span
                                                       v-for="tag in response.treatment"
                                                       class="btn btn-light btn-sm mr-2 mb-2">{{ tag }}</span>
                                             </div>
                                        </div>
                                        <div v-else class="no-treatment-data">
                                             <h5 class="card-text">How was your {{ response.date | dateFormat }} ?</h5>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div class="treatment-settings" v-show="response.isShowSettings">
                              <div :id="response.id">
                                   <div class="treatment-config m-auto">
                                        <div class="format-mood-setting pb-3">
                                             <h5 class="card-text mb-4">How was your {{ response.date | dateFormat }} ?</h5>
                                             <div class="row align-items-start mb-4">
                                                  <div v-for="mood in dayType"
                                                       class="col mood-type treatment-select-d"
                                                       :class="{active: mood.id == isActiveMood}"
                                                       @click="isActiveMood = mood.id; moodSelected($event)">
                                                       <i :class="mood.className"></i>
                                                       <span>{{ mood.moodType | uppercase }}</span>
                                                  </div>
                                             </div>
                                        </div>
                                        <div class="format-activities-setting">
                                             <h5 class="card-text mb-3">Were your activities affected?</h5>
                                             <div class="row align-items-start mb-4">
                                                  <div v-for="energy in activeLevels"
                                                  class="col level-type treatment-select-d"
                                                  :class="{active: energy.id == isActiveLevel}"
                                                  @click="isActiveLevel = energy.id; levelSelected($event)">
                                                       <i :class="energy.className"></i>
                                                       <span v-model="responseObj.activeLevelSelected">
                                                            {{ energy.levelType | uppercase }}</span>
                                                  </div>
                                             </div>
                                        </div>
                                        <div class="format-treatment-setting">
                                             <div class="treatment-used pb-1">
                                                  <h5 class="card-text mb-3" v-if="filteredSettings.length">Treatment(s) Used</h5>
                                                  <div id="filtered-settings" v-if="response.showLess">
                                                       <div class="form-check form-check-inline filteredSettings-inline" v-for="data in filteredSettings">
                                                         <input
                                                            class="form-check-input filteredSetting"
                                                            type="checkbox"
                                                            v-model="responseObj.selectedTreament"
                                                            :value="data.name">
                                                         <label class="form-check-label" :for="data.name">{{ data.name }}</label>
                                                       </div>
                                                  </div>
                                                  <div v-else>
                                                       <div class="form-check form-check-inline" v-for="data in treatments">
                                                         <input
                                                            class="form-check-input treatment"
                                                            type="checkbox"
                                                            v-model="responseObj.selectedTreament"
                                                            :value="data.name">
                                                         <label class="form-check-label" :for="data.name">{{ data.name }}</label>
                                                       </div>

                                                  </div>
                                                   <a href="javascript:void(0)" v-if="filteredSettings.length"
                                                   @click="showAll(response)" class="show-all pt-3">{{response.showLess ? 'Show More' : 'Show Less'}}</a>

                                             </div>
                                        </div>
                                        <div class="format-notes-setting">
                                             <div class="form-group mt-3 mb-4 pb-2">
                                              <label for="exampleFormControlTextarea1">Notes</label>
                                              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="responseObj.notes"
                                              :placeholder="response.notes.length ? response.notes : ''"></textarea>
                                             </div>
                                        </div>
                                        <button type="button" name="button" class="btn btn-primary float-right" @click="onSubmitSetting(response)"><i class="fa fa-cloud"></i> Save</button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script>
export default {
     name: 'recent-tab',
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
               responseObj: {
                    moodSelected: null,
                    activeLevelSelected: null,
                    selectedTreament: [],
                    notes: ''
               },
               dayType: [
                    { id: 1, className: 'fa fa-laugh fa-4x', moodType: 'good' },
                    { id: 2, className: 'fas fa-smile fa-4x', moodType: 'okay' },
                    { id: 3, className: 'fas fa-frown fa-4x', moodType: 'bad' }
               ],
               activeLevels: [
                    { id: 1, className: 'fa fa-battery-full fa-4x', levelType: 'full' },
                    { id: 2, className: 'fas fa-battery-half fa-4x', levelType: 'half' },
                    { id: 3, className: 'fas fa-battery-empty fa-4x', levelType: 'none' }
               ],
               data: [],
               treatments: [],
               isActiveMood: false,
               isActiveLevel: false,
               showLess: true
          }
     },
     computed: {
          filteredSettings() {
               let newArrayTreatment = [...this.treatments]
               return newArrayTreatment.filter((data) => {
                    if (data.status == true) {
                         return data.name;
                         return data.id;
                    }
               });

               return newArrayTreatment;
          }
     },
     methods: {
          fetchData() {
               this.$http.get('https://healint-vue-exam.firebaseio.com/recent_tabs.json')
               .then((data) => { return data.json(); })
               .then((data) => {
                    var tmpItems = [];
                    for(let key in data) {
                         data[key].id = key;
                         data[key].isShowSettings = false;
                         data[key].isShowTreatment = true;
                         data[key].isShowAllTreatmentTags = false;
                         data[key].showLess = true;

                         tmpItems.push(data[key]);
                    }

                    this.data = tmpItems;
               })
               .catch((error) => { console.log('Error: ', error)});
          },
          showSettings(response) {
               if (response.isShowSettings =! response.isShowSettings) {
                     response.isShowTreatment = false;
               }
               else {
                     response.isShowTreatment = true;
               }
          },
          showAll(response) {
               if (response.showLess = response.showLess) {
                     response.showLess = false;
               }
               else {
                     response.showLess = true;
               }
          },
          getSettings() {

               this.$http.get('https://healint-vue-exam.firebaseio.com/settings_tabs.json')
               .then((data) => { return data.json(); })
               .then((data) => {
                    var tmpItems = [];
                    for(let key in data) {
                         data[key].id = key;
                         tmpItems.push(data[key]);
                    }

                    this.treatments = tmpItems;
                    this.$eventHub.$on('displayStatus', (data) => {
                         if (data.status == true) {
                              this.treatments.push(data)
                         }

                         if (data.status == false) {
                              const elem = document.querySelector('#filtered-settings');
                              for (var i = 0; i < this.filteredSettings.length; i++) {
                                   if(this.filteredSettings[i].name === data.name) {
                                        elem.children[i].remove()
                                   }
                              }
                         }

                    });
               })
               .catch((error) => { console.log('Error: ', error)});
          },
          getMoodClass(moodType) {

               const mood = moodType.toLowerCase();
               var classMode = "";

               if (mood == 'good') {
                    classMode = 'fa-laugh';
               }
               else if (mood == 'okay') {
                    classMode = 'fa-smile';
               }
               else if (mood == 'bad') {
                    classMode = 'fa-frown';
               }
               else {
                    return;
               }

               return classMode;
          },
          getLevelClass(levelType) {

               const level = levelType.toLowerCase();
               var classLevel = "";

               if (level == 'full') {
                    classLevel = 'btn-success';
               }
               else if (level == 'half') {
                    classLevel = 'btn-warning';
               }
               else if (level == 'none') {
                    classLevel = 'btn-danger';
               }
               else {
                    return;
               }

               return classLevel;
          },
          moodSelected(event) {
               this.responseObj.moodSelected = event.target.nextElementSibling.innerText;
          },
          levelSelected(event) {
               this.responseObj.activeLevelSelected = event.target.nextElementSibling.innerText;
          },
          onSubmitSetting(response) {

               this.$emit('onSubmitSetting', this.childData = true);

               var tmpArray = [];
               var treatmentUsed = response.treatment;
               var treatmentSelected = this.responseObj.selectedTreament;

               // this.arrayUnique(response.treatment.concat( this.responseObj.selectedTreament))
               // tmpArray = this.arrayUnique(treatmentUsed.concat(treatmentSelected));
               tmpArray = [...treatmentUsed, ...treatmentSelected];

               let settingUpdate = {
                    activeLevel: this.responseObj.activeLevelSelected != null ? this.responseObj.activeLevelSelected : response.activeLevel,
                    date: response.date,
                    dayExists: true,
                    dayType: this.responseObj.moodSelected !=null ? this.responseObj.moodSelected : response.dayType,
                    notes: this.responseObj.notes.length > 0 ? this.responseObj.notes : response.notes,
                    treatment: this.arrayUnique(tmpArray)
               }

               this.$http.put('https://healint-vue-exam.firebaseio.com/recent_tabs/' + response.id + '.json', settingUpdate)
               .then((response) => {
                    this.$emit('onSubmitSetting', this.childData = false);
                    location.reload();
               })
               .catch((error) => { console.log('Error: ', error)});
          },
          arrayUnique(array) {
               // var a = array.concat();
               // var tmpArray = [];
               // for (var i = 0; i < a.length; i++) {
               //      for (var j = i + 1; j < a.length; ++j) {
               //           if (a[i] === a[j]) {
               //               a.splice(j--, 1);
               //           }
               //      }
               // }
               //
               // return a;
               let unique = {};
               array.forEach(function(i) {
                 if(!unique[i]) {
                   unique[i] = true;
                 }
               });

               return Object.keys(unique);
          }
     },
     created() {
          this.fetchData();
          this.getSettings();
     },
     filters: {
          uppercase(value) {
               if (!value) {
                    return;
               }
               return value.toString().toUpperCase();
          },
          removeBracket(value) {
               if (!value) {
                    return;
               }
               return value.replace(/[\[\]']+/g,'');
          },
          dateFormat(value) {
               if (!value) {
                    return;
               }

               const months = [
               "January", "February", "March", "April", "May", "June", "July", "August",
               "September", "October", "November", "December"
               ];

               const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

               var d = new Date(value);
               let date = d.getDate();
               let dayIndex = d.getDay()
               let monthIndex = d.getMonth();
               let year = d.getFullYear();

               return days[dayIndex] + ' ' + months[monthIndex] + ' ' + date;
          }
     }
}
</script>

<style lang="css">

     a:hover{
          text-decoration: none;
     }

     h5{
          font-size: 1.0625rem;
     }

     .response button {
          letter-spacing: 0.1em;
     }

     .treatment-select-d:hover,
     .treatment-select-d.active{
          color: #d4860b;
          cursor: pointer;
     }

     .mood i{
          color: #ecf0f1;
     }

     .mood-type i,
     .level-type i{
          display: block;
          text-align: center;
     }

     .mood-type span,
     .level-type span{
          text-align: center;
          margin-top: 10px;
     }

     .card-header h6{
          margin: 0;
     }

     span{
          display: block;
          letter-spacing: 0.06em;
          font-size: 0.75rem;
     }

     .show-all{
          display: block;
          text-align: center;
     }

     .no-treatment-data{
          position: relative;
          top: 50%;
          transform: translateY(-50%);
     }

      @media (min-width: 768px) {
           .treatment-config{
                width: auto;
           }
      }

      @media (min-width: 1200px) {
          .treatment-config{
               width: 540px;
          }
      }
</style>

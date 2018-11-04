<template lang="html">
     <div id="add-form-treatment">
          <div class="message-box alert alert-danger" role="alert" v-if="errors.length">
               <ul>
                    <li v-for="error in errors"> {{ error }}</li>
               </ul>
          </div>
         <form v-on:submit.prevent="onSubmit">
              <div class="form-group">
                   <label for="treatement-name">Treatment Name</label>
                   <input type="text" class="form-control" id="treatement-name" placeholder="Enter name" v-model="customType.name">
                   {{ customType.name }}
              </div>
              <div class="form-group">
                   <label for="custom-type">Select Custom Type</label>
                   <select class="form-control" id="custom-type" v-model="customType.customType">
                        <option v-for="customType in customTypes">{{ customType | ucFirst }}</option>
                   </select>
              </div>
              <button type="submit" class="btn btn-secondary">Submit</button>
         </form>
     </div>
</template>

<script>
export default {
     name: 'add-form-treatment',
     data() {
          return {
               customTypes:['preventative', 'relief', 'rescue med', 'others'],
               customType: {
                    name: '',
                    customType: '',
                    status: "false"
               },
               errors: []
          }
     },
     methods: {
          onSubmit() {
               this.errors = [];

               if (!this.customType.name) {
                    this.errors.push('Name required');
               }

               if (!this.errors.length) {
                    const dataObject = this.customType;
                    this.$http.post('https://healint-vue-exam.firebaseio.com/settings_tabs.json', dataObject)
                    .then((response) => {
                         console.log(response)
                    })
                    .catch((error) => { console.log('Error: ', error)})
               }
          }
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
<style>
     ul{
          margin: 0;
          list-style-type: none;
          padding: 0;
     }
</style>

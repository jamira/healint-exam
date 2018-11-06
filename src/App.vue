<template>
  <div id="app">
       <Header></header>
           <main role="main">
                <transition name="fade">
                     <div v-if="isLoading" class="loading">
                          <p>Loading...</p>
                     </div>
                </transition>
                <div class="mt-5 container">
                     <div id="desktop" class="d-none d-lg-block">
                          <div class="row">
                             <RecentTab @onSubmitSetting="isLoading = $event"></RecentTab>
                             <SettingsTab @displayStatus="isLoading = $event"></SettingsTab>
                          </div>
                     </div>

                     <div id="mobile" class="d-block d-sm-block d-lg-none">
                          <ul class="nav nav-pills mb-3" role="pills-tab">
                            <li class="nav-item" v-for="tab in tabs">
                              <a :class="activeTabName == tab.name ? 'active show' : ''" class="nav-link" :id="tab.name" data-toggle="tab" :href="'#'+tab.name" role="tab" :aria-controls="tab.name" aria-selected="true" @click.prevent="onClickTab(tab.name, $event)">
                                   <i class="fa" :class="tab.classFa"></i>
                                   {{tab.displayName}}</a>
                            </li>
                          </ul>

                          <div class="tab-content">
                            <div :class="activeTabName == 'recent' ? 'active show' : ''" class="tab-pane" id="recent" role="tabpanel" aria-labelledby="recent">
                                   <RecentTab @onSubmitSetting="isLoading = $event"></RecentTab>
                            </div>
                            <div :class="activeTabName == 'settings' ? 'active show' : ''" class="tab-pane" id="settings" role="tabpanel" aria-labelledby="settings">
                                   <SettingsTab @displayStatus="isLoading = $event"></SettingsTab>
                            </div>
                          </div>
                     </div>
                </div>
            </main>
  </div>
</template>

<script>
import Header from './components/Header'
import RecentTab from './components/RecentTab'
import SettingsTab from './components/SettingsTab'

export default {
     data() {
          return {
               isLoading: false,
               tabs: [
                 {
                        name: 'recent',
                        classFa: 'fa-list-alt',
                        displayName: 'Recent',
                        status: null
                 },
                 {
                        name: 'settings',
                        classFa: 'fa-cog',
                        displayName: 'Settings',
                        status: null
                 }
               ],
               activeTabName: null,
          }
     },
     name: 'app',
     components: {
          Header,
          RecentTab,
          SettingsTab
     },
     mounted() {
          var activeTab = localStorage.getItem("activeTab");
          if (activeTab) {
               this.activeTabName = activeTab;
          }
          else {
               this.activeTabName = this.tabs[0].name;
          }
     },
     methods: {
          onClickTab(tab, e) {
               this.activeTabName = tab;
               localStorage.setItem("activeTab", tab);
          },
          displayContent(name) {
            return this.activeTabName === name;
          },
     }
}
</script>

<style lang="scss">
h5{
     margin: 0;
}

/*
loading*/
.loading {
     position: fixed;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     background-color: rgba(20,29,37, 0.4);
     z-index: 9999;
}

.loading p{
     background: #fff;
     width: 150px;
     text-align: center;
     margin: 40vh auto 0;
     padding: 40px 0;
     border-radius: 3px;
     box-shadow: 0 0 20px #333;
}

#mobile #settings-tab,
#mobile #recent-tab,{
     padding: 0;
}
</style>

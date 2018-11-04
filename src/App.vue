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
                         <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                              <li class="nav-item">
                                   <a class="nav-link active" id="pills-recent-tab" data-toggle="pill" href="#recent" role="tab" aria-controls="pills-recent" aria-selected="true"><i class="fa fa-list-alt"></i> Recent</a>
                              </li>
                              <li class="nav-item">
                                   <a class="nav-link" id="pills-settings-tab" data-toggle="pill" href="#settings" role="tab" aria-controls="pills-settings" aria-selected="false"><i class="fa fa-cog fa-sm"></i> Settings</a>
                              </li>
                         </ul>
                         <div class="tab-content" id="pills-tabContent">
                              <div class="tab-pane fade show active" id="recent" role="tabpanel" aria-labelledby="pills-recent">
                                   <RecentTab @onSubmitSetting="isLoading = $event"></RecentTab>
                              </div>
                              <div class="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="pills-settings">
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
               isLoading: false
          }
     },
     name: 'app',
     components: {
          Header,
          RecentTab,
          SettingsTab
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

#mobile #pills-tab{
     padding: 0 15px;
}
</style>

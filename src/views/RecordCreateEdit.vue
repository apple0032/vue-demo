<style>
html{
  background: #F8FAF7;
}
</style>

<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <template>
          <v-form id="RecordForm" :lazy-validation="lazy">
            <v-card class="edit-form-container mx-auto" max-width="1050" min-height="950" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="page-header">
                    <div class="d-inline">
                      <BackButton
                          title="Back"
                          @back-action="backAction"
                      />
                    </div>
                    <div class="d-inline">
                        <div class="login-title text-center" v-if="(isNewRecord === true)">{{$t("records.createRecord")}}</div>
                        <div class="login-title text-center" v-else>{{$t("records.editRecord")}}</div>
                    </div>
                  </div>
                </v-list-item-content>
              </v-list-item>

              <v-container>

                <v-container class="form-container">

                  <v-container class="record_thumbnail">
                    <v-row no-gutters>
                      <v-col cols="12" sm="6" v-if="( (creationForm.thumbnail != null) && (isNewRecord === false)  )">

                        <div>
                          <div class="thumbnail_icon" :style="displayThumbnail(creationForm.thumbnail)"></div>
                        </div>

                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-file-input
                            :label="$t('records.uploadThumbnail')"
                            accept="image/*"
                            outlined
                            v-model="NewThumbnail"
                        >
                        </v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>


                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t("records.record_title")}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.record_title"
                                    :rules="[rules.required, rules.name_min]" :label="$t('records.record_title')"  required solo></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t('records.contractor_company')}}</div>
                      <v-text-field class="form-input-box" v-model="creationForm.contractor_company" :label="$t('records.contractor_company_label')" solo></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container class="form-container published-container">
                  <v-row no-gutters>
                    <v-col cols="12" sm="6">
                      <div class="label-left">{{$t("records.publish_date")}}</div>
                      <VueCtkDateTimePicker v-model="creationForm.publish_date"
                                            :format="'YYYY-MM-DD'"
                                            :formatted="'YYYY-MM-DD'"
                                            :label="$t('userCreate.expected_completion_date_label')"
                                            input-size="lg" only-date	autoClose noHeader noButtonNow></VueCtkDateTimePicker>
                    </v-col>
                    <v-col cols="12" sm="6" style="text-align: left;">
                      <div class="label-left">{{$t("records.publish_time")}}</div>
                      <v-row no-gutters>
                        <v-col cols="12" sm="6" >
                          <v-select v-model="creationForm.publish_hour" :items="hours" :label="null" outlined style="width: 80%; display: inline-block"></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" >
                          <v-select v-model="creationForm.publish_min" :items="minute" :label="null" outlined style="width: 80%; display: inline-block"></v-select>
                        </v-col>
                      </v-row>
                    </v-col>

                  </v-row>
                </v-container>

                <v-container class="view-record-desc-container">
                  <v-row no-gutters>
                    <v-col cols="12" sm="12">
                      <div class="profile_header_value text-left">
                        <div class="desc-title">{{$t('records.description')}}</div>
                        <v-textarea v-model="creationForm.description" :label="$t('records.description_label')"></v-textarea>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>

              </v-container>

              <v-container class="vr-container">
                <div class="label-left">{{$t("records.vr_device")}}</div>
                <div class="devices-filter-container" v-if="(isNewRecord === false)">
                  <v-select v-model="defaultSelected" :items="devices_list" item-value="id" item-text="device_name_en" :label="null" outlined @change="filterDevice" style="width: 250px" item-color="green" background-color="#F4F9E9"></v-select>
                </div>

                <div v-for="(document, index) in creationForm.devices" :key="'info-'+ index" class="document-each">
                  <v-container :class="`devices-container dev-each-${index}`" :id= "`dev-ele-${index}`" v-if="(filterDev === document.name || document.new === true)">
                    <v-row no-gutters>
                      <v-col cols="12" sm="3">
                        <div class="label-left">{{$t("records.vr_device")}}</div>
                        <v-select v-model="document.name" :items="devices_list" item-value="id" item-text="device_name_en" :label="null" outlined :disabled="selectStatus(!document.new)"
                                  @change="selectDevice(index, $event)" :background-color="backgroundColor(!document.new)"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="2">
                        <div class="label-left" style="margin-left: 43px">{{$t("records.version_name")}}</div>
                        <v-text-field class="form-input-box" v-model="document.version" :label="$t('records.version_name')" solo></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="5" :class="`vr_url-${index} ${isUrl(document.is_url)} fileOrURL`">
                        <div class="label-left">{{ $t('records.downloadUrl') }}</div>
                        <v-text-field class="form-input-box" v-model="document.url" :label="'URL'" solo></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="5" style="margin-top: -13px; padding-top: 47px; text-align: left" :class="`vr_file-${index} ${isUrl(document.is_url,'file')} fileOrURL`">
                        <div style="width: 55%; display: inline-block; vertical-align: top;" class="v-file-show hide">
                          <v-file-input
                              :label="$t('records.file')"
                              outlined
                              v-model="document.file"
                              :id="`dev-file-${index}`"
                              @change="uploadFile(index)"
                          >
                          </v-file-input>
                        </div>
                        <div style="width: 40%; display: inline-block">
                          <v-btn class="add_file-btn" @click="addFile(index)">
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.00293 9.77792H9.58993V6.19092H11.7319V9.77792H15.3189V11.9199H11.7319V15.5069H9.58993V11.9199H6.00293V9.77792Z" fill="#324E4F"/>
                              <circle cx="10.5" cy="10.5" r="9.5" stroke="#324E4F" stroke-width="2"/>
                            </svg>
                            {{ $t('records.chooseFile') }}
                          </v-btn>
                        </div>
                      </v-col>

                      <v-col cols="12" sm="2" v-if="(isNewRecord === false)">
                        <div v-if="document.ofile != null">
                          <a :href="`${fileUrl(document.ofile)}`" target="_blank">{{$t('records.viewFile')}}</a>
                        </div>
                        <div class="confirm-device">
                          <v-btn @click="confirmUpdateDevice(document.id , index)" class="confirm-device-btn">
                            {{$t('records.confirmBtn')}}
                          </v-btn>
                        </div>
                      </v-col>

                    </v-row>
                  </v-container>
                </div>

                <div :class="`add_package`">
                  <v-btn @click="addDoc" class="add-btn">
                    {{$t('records.new_package')}}
                  </v-btn>
                </div>
              </v-container>

              <div class="vlog-container" v-if="(isNewRecord === false && filterDev !== '')">
                <div class="label-left"  style="margin-left: 30px; font-size: 20px;">{{$t('records.versionLog')}}</div>
                <div class="vlog-table">
                  <div class="vlog-header">
                    <v-row no-gutters class="vlog-title">
                        <v-col cols="12" md="4" class="vlog-data">
                          {{$t('records.vlogDate')}}
                        </v-col>
                        <v-col cols="12" md="4" class="vlog-data">
                          {{$t('records.vlogVersion')}}
                        </v-col>
                        <v-col cols="12" md="4" class="vlog-data">
                          {{$t('records.vlogUpload')}}
                        </v-col>
                    </v-row>
                    <div v-for="(log, index) in versionLog" :key="'log-'+ index">
                      <v-row no-gutters class="each-log">
                        <v-col cols="12" md="4" class="vlog-data">
                          {{ $displayDateTime(log.created_at,"long") }}
                        </v-col>
                        <v-col cols="12" md="4" class="vlog-data">
                          {{ log.version }}
                        </v-col>
                        <v-col cols="12" md="4" class="vlog-data">

                          <div class="vlog_avatar" v-if="(log.user.user_info.user_avatar !== null)" :style="displayLogAvatar(log.user.user_info.user_avatar)"></div>
                          <div class="vlog_avatar default-avatar" v-else></div>

                          <span v-if="($i18n.locale === 'en')">
                            {{ log.user.user_info.contact_person_en }}
                          </span>
                          <span v-else>
                            {{ log.user.user_info.contact_person_zh }}
                          </span>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </div>
              </div>

              <div class="screenshot-container">
                <v-row class="screenshot-view" v-if="(isNewRecord === false)">
                  <v-col>
                    <div class="gallery-thumbnail-container">
                      <p class="training-description-title">{{$t("trainingDetails.screenshots")}}</p>
                      <div class="d-flex flex-wrap">
                        <v-card
                            class="px-2"
                            :key="i"
                            v-for="(image, i) in gallery"
                            style="box-shadow: none !important; background: #4646461c; margin-right: 10px; margin-top: 10px"
                        >
                          <span class="screenshot-delete" @click="OpenDeleteImageDialog(i)">
                            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_d)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.83389 21.8685C6.88154 21.8685 6.07295 21.1138 6.00107 20.1614L5.21045 9.8833H16.2612L15.4706 20.1614C15.3987 21.1317 14.6081 21.8685 13.6378 21.8685H7.83389ZM13.0628 12.1833C12.7933 12.1833 12.5956 12.3989 12.5956 12.6505V19.1013C12.5956 19.3708 12.8112 19.5685 13.0628 19.5685C13.3323 19.5685 13.53 19.3528 13.53 19.1013V12.6505C13.53 12.381 13.3144 12.1833 13.0628 12.1833ZM10.2776 12.6505C10.2776 12.3989 10.4753 12.1833 10.7448 12.1833C10.9964 12.1833 11.212 12.381 11.212 12.6505V19.1013C11.212 19.3528 11.0144 19.5685 10.7448 19.5685C10.4933 19.5685 10.2776 19.3708 10.2776 19.1013V12.6505ZM8.44482 12.1833C8.17529 12.1833 7.97764 12.3989 7.97764 12.6505V19.1013C7.97764 19.3708 8.19326 19.5685 8.44482 19.5685C8.71436 19.5685 8.91201 19.3528 8.91201 19.1013V12.6505C8.91201 12.381 8.69639 12.1833 8.44482 12.1833Z" fill="white"/> </g> <g filter="url(#filter1_d)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4042 7.11621H15.9378C16.7643 7.11621 17.4292 7.78105 17.4292 8.60762C17.4292 8.80527 17.2675 8.96699 17.0698 8.96699H4.4198C4.22214 8.96699 4.06042 8.80527 4.06042 8.60762C4.06042 7.78105 4.72527 7.11621 5.55183 7.11621H8.08542V6.55918C8.08542 5.5709 8.89402 4.78027 9.86433 4.78027H11.6253C12.6136 4.78027 13.4042 5.58887 13.4042 6.55918V7.11621ZM9.86433 6.18184C9.64871 6.18184 9.46902 6.36152 9.46902 6.57715V7.13418H12.0206V6.57715C12.0206 6.36152 11.8409 6.18184 11.6253 6.18184H9.86433Z" fill="white"/> </g> <defs> <filter id="filter0_d" x="1.21045" y="5.8833" width="19.0508" height="19.9852" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/> </filter> <filter id="filter1_d" x="0.0604248" y="0.780273" width="21.3687" height="12.1867" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset/> <feGaussianBlur stdDeviation="2"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/> </filter> </defs> </svg>
                          </span>
                          <img
                              class="gallery-thumbnail"
                              :src="image"
                              @click="gallerySelectedIndex = i" />
                        </v-card>
                        <vue-gallery-slideshow
                            :images="gallery"
                            :index="gallerySelectedIndex"
                            @close="gallerySelectedIndex = null"
                        />
                      </div>

                    </div>
                  </v-col>
                </v-row>
                <div class="label-left">{{$t('records.screenshots')}}</div>
                <v-container id="upload_screenshots" :style="displayUploaded()">
                  <v-file-input
                      :label="$t('records.upload')"
                      multiple
                      accept="image/*"
                      outlined
                      v-model="creationForm.screenshot"
                      @change="uploadScreenShots"
                      show-size

                  >
                  </v-file-input>
                </v-container>

                <div class="screenshot_upload_box" v-if="displayUploadBox" @click="triggerUploadScreenShots">
                  <v-container>
                    <v-row no-gutters>
                      <v-col cols="12" sm="2">
                        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M26.3732 15.5623C26.3732 15.3702 26.3114 15.2124 26.1879 15.0889L18.943 7.844C18.8195 7.72051 18.6617 7.65877 18.4696 7.65877C18.2775 7.65877 18.1197 7.72051 17.9962 7.844L10.7719 15.0684C10.6346 15.233 10.566 15.3977 10.566 15.5623C10.566 15.7544 10.6278 15.9122 10.7513 16.0357C10.8748 16.1592 11.0326 16.221 11.2247 16.221H15.8351V23.4659C15.8351 23.6443 15.8968 23.8021 16.0203 23.9393C16.1575 24.0628 16.3153 24.1245 16.4937 24.1245H20.4455C20.6239 24.1245 20.7748 24.0628 20.8983 23.9393C21.0355 23.8021 21.1041 23.6443 21.1041 23.4659V16.221H25.7145C25.8929 16.221 26.0438 16.1592 26.1673 16.0357C26.3045 15.8985 26.3732 15.7407 26.3732 15.5623ZM39.5458 21.49C39.5458 23.6717 38.7705 25.5378 37.22 27.0883C35.6832 28.6252 33.8239 29.3936 31.6422 29.3936H9.24877C6.7103 29.3936 4.53545 28.4948 2.72422 26.6973C0.92671 24.8861 0.0279541 22.7112 0.0279541 20.1727C0.0279541 18.3889 0.508205 16.7424 1.46871 15.233C2.42921 13.7236 3.71903 12.5916 5.33816 11.8369C5.31072 11.4253 5.29699 11.1303 5.29699 10.9519C5.29699 8.04297 6.3261 5.55938 8.38432 3.50116C10.4425 1.44294 12.9261 0.413835 15.8351 0.413835C17.9756 0.413835 19.9309 1.01072 21.701 2.20449C23.4848 3.39825 24.7815 4.98308 25.591 6.95897C26.5653 6.10824 27.7041 5.68287 29.0077 5.68287C30.4621 5.68287 31.7039 6.19743 32.7331 7.22654C33.7622 8.25565 34.2767 9.49744 34.2767 10.9519C34.2767 11.9947 33.9954 12.9415 33.4328 13.7923C35.2166 14.2176 36.678 15.1507 37.8169 16.5914C38.9695 18.0185 39.5458 19.6513 39.5458 21.49Z" fill="#9FCB3D"/>
                        </svg>
                      </v-col>
                      <v-col cols="12" sm="10" style="margin-top: -10px">
                        <div class="upload_box_title1"> {{$t("records.file_upload_box")}}  </div>
                        <div class="upload_box_title2"> 1920(w) X 1080(h) </div>
                        <div class="upload_box_title3"> {{$t("records.file_limit")}} </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>

              </div>

              <v-card-actions style="justify-content: left">
                <v-btn text class="record-reset-btn" @click="resetPage" v-if="(isNewRecord === true)">
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.17791 9.17829C4.0995 9.40371 3.95248 9.51642 3.73686 9.51642H0.81125C0.683836 9.51642 0.573575 9.46987 0.480465 9.37676C0.387355 9.28365 0.3408 9.17339 0.3408 9.04597V8.94306C0.977868 6.31638 2.30101 4.18711 4.31022 2.55523C6.31944 0.923359 8.67169 0.107422 11.367 0.107422C12.7979 0.107422 14.1897 0.379401 15.5422 0.923359C16.8948 1.46732 18.0954 2.23425 19.1441 3.22415L21.0553 1.32765C21.2415 1.14143 21.462 1.04832 21.7169 1.04832C21.9717 1.04832 22.1922 1.14143 22.3784 1.32765C22.5647 1.51387 22.6578 1.73439 22.6578 1.98922V8.57552C22.6578 8.83035 22.5647 9.05087 22.3784 9.23709C22.1922 9.42331 21.9717 9.51642 21.7169 9.51642H15.1306C14.8757 9.51642 14.6552 9.42331 14.469 9.23709C14.2828 9.05087 14.1897 8.83035 14.1897 8.57552C14.1897 8.32069 14.2828 8.10017 14.469 7.91395L16.4978 5.88514C15.0473 4.54239 13.337 3.87102 11.367 3.87102C10.0536 3.87102 8.8285 4.18956 7.69158 4.82662C6.55466 5.46369 5.64316 6.34088 4.95709 7.4582C4.84928 7.62482 4.58955 8.19818 4.17791 9.17829ZM18.3355 20.2412C16.3361 21.8731 13.9937 22.689 11.3082 22.689C9.87721 22.689 8.49282 22.4195 7.15497 21.8804C5.81713 21.3414 4.62386 20.572 3.57514 19.5723L1.67864 21.4688C1.49242 21.655 1.2719 21.7481 1.01707 21.7481C0.762245 21.7481 0.541721 21.655 0.355502 21.4688C0.169282 21.2826 0.0761719 21.062 0.0761719 20.8072V14.2209C0.0761719 13.9661 0.169282 13.7456 0.355502 13.5594C0.541721 13.3731 0.762245 13.28 1.01707 13.28H7.60337C7.8582 13.28 8.07872 13.3731 8.26494 13.5594C8.45116 13.7456 8.54427 13.9661 8.54427 14.2209C8.54427 14.4757 8.45116 14.6963 8.26494 14.8825L6.25083 16.8966C6.9467 17.5435 7.73569 18.0433 8.61778 18.3962C9.49987 18.749 10.4163 18.9254 11.367 18.9254C12.6803 18.9254 13.9054 18.6069 15.0424 17.9698C16.1793 17.3328 17.0908 16.4556 17.7769 15.3382C17.8847 15.1716 18.1444 14.5983 18.556 13.6182C18.6344 13.3927 18.7815 13.28 18.9971 13.28H21.8198C21.9472 13.28 22.0575 13.3266 22.1506 13.4197C22.2437 13.5128 22.2902 13.6231 22.2902 13.7505C22.2902 13.7995 22.2853 13.8338 22.2755 13.8534C21.6483 16.4801 20.3349 18.6093 18.3355 20.2412Z" fill="#666666"/>
                  </svg>
                  {{$t('records.reset')}}
                </v-btn>

                <v-btn :loading="loading" text class="record-save-btn" @click="submitHandler"><v-icon class="mr-1">mdi-content-save</v-icon>{{$t('records.submitBtn')}}</v-btn>
              </v-card-actions>

              <p class="login-error" v-if="errors.length">
                <b>{{$t('userCreate.submit_alert')}}</b>
              <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
              </ul>
              </p>


            </v-card>
          </v-form>
          <v-dialog
              v-model="confirmDelete"
              :width="350"
          >
            <template>
              <div class="confirm-dialog-container">
                <div class="confirm-dialog">
                  <div>{{$t("records.confirmDeleteScreenShot")}}</div>
                  <div class="btn-group">
                    <v-btn @click="CloseDeleteImageDialog">{{$t("generic.btn.cancel")}}</v-btn>
                    <v-btn @click="confirmDeleteImg" color="error">{{$t("generic.btn.confirm")}}</v-btn>
                  </div>
                </div>
              </div>
            </template>
          </v-dialog>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import BackButton from '../components/BackButton';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import {getRecordById, getDevices, deleteScreenShot} from "@/apis/Record";
import moment from "moment";
import store from "@/store";
import axios from 'axios';
import VueGallerySlideshow from 'vue-gallery-slideshow';

export default {
  name: "creationForm",
  pwshow: false,
  props: {},
  components: {
    BackButton,
    VueCtkDateTimePicker,
    VueGallerySlideshow
  },
  beforeMount() {
    if(this.$store.getters.isAdmin === false){
      this.$router.push({name: 'Login'})
    }
  },
  data() {
    return {
      displayUploadedFiles : false,
      displayUploadBox : true,
      isNewRecord: this.$route.params.id == undefined ? true: false,
      rules: {
        name_min: (v) => v.length >= 4 || "Min 4 characters",
        required: (v) => !!v || "Required."
      },
      gallerySelectedIndex: null,
      gallery: [],
      galleryIndex : [],
      versionLog : [],
      sourceVersionLog : [],
      validForm: true,
      lazy: false,
      confirmDelete: false,
      selectedImage : null,
      selectedIndex : null,
      creationForm: {
        record_title: "",
        publish_date: "",
        publish_hour: "",
        publish_min: "",
        contractor_company: "",
        description: "",
        devices : [
          { name : "" , new : true}
        ],
        devices_version : [
          { version : "" }
        ],
        devices_download : [
          { url : "" }
        ],
        screenshot : []
      },
      userId: null,
      loading: false,
      errors: [],
      hours: this.getHours(),
      minute : this.getMin(),
      devices_list : [],
      userID : this.$store.getters.userID,
      filterDev : "",
      defaultSelected : {
        id : 1,
        device_name_en : "Oculus Quest"
      },
      NewThumbnail : []
    };
  },
  computed: {
    allowSelect()
    {
      if (this.isNewRecord == false)
        return true
      else
        return false
    }
  },
  async created(){

    console.log(this.isNewRecord);
    if(this.isNewRecord === false) {
      let record = await this.getRecordData();
      console.log(record);
      if(record.data.response_code == 401){
        this.$noty.error("Record not found.");
        this.$router.push({name: 'trainings'})
      }

      this.creationForm.record_title = record.data.result.training_record_name_en
      this.creationForm.contractor_company = record.data.result.company_name_en
      this.creationForm.publish_date = record.data.result.publish_date
      let published = (record.data.result.publish_time).split(":")

      this.creationForm.publish_hour = (published[0])
      this.creationForm.publish_min = (published[1])
      this.creationForm.description =  record.data.result.description_en

      //this.creationForm.devices = record.data.result.records_devices
      if( ((record.data.result.records_devices).length) > 0 ){
        let dev = [];
        for (const rd of (record.data.result.records_devices) ) {
          dev.push({id: rd.id , name: rd.devices_id, version: rd.version , url : rd.url, ofile : rd.file , is_url : rd.device.is_url})
        }
        this.creationForm.devices = dev
      }

      if( ((record.data.result.records_screenshots).length) > 0 ){
        let screenImg = [];
        let galleryIndexArr = [];
        for (const rs of (record.data.result.records_screenshots) ) {
          screenImg.push(this.fileUrl(rs.file))
          galleryIndexArr.push(rs.id)
        }
        //console.log(screenImg);
        this.gallery = screenImg;
        this.galleryIndex = galleryIndexArr;
      }

      if( ((record.data.result.records_versionlogs).length) > 0 ) {
        this.versionLog = record.data.result.records_versionlogs;
        this.sourceVersionLog = this.versionLog;
      }

      this.creationForm.thumbnail = (record.data.result.thumbnail);

    }

    let devices = await getDevices();
    this.devices_list = devices.data.result;

    if(this.creationForm.devices.length > 0) {
      this.filterDevice(this.creationForm.devices[0]["name"])
      this.defaultSelected = {
        id : this.creationForm.devices[0]["name"]
      }
    }

  },
  methods: {
    triggerUploadScreenShots(){
      var container = document.getElementById("upload_screenshots");
      var input = container.getElementsByTagName("input");
      input[0].click();
    },
    displayUploaded(){
      if(this.displayUploadedFiles === false) {
        return "display: none"
      } else {
        return "display: block"
      }
    },
    uploadScreenShots (){
      if( (this.creationForm.screenshot).length > 0 ) {
        this.displayUploadedFiles = true;
        this.displayUploadBox = false;
      } else {
        this.displayUploadedFiles = false;
        this.displayUploadBox = true;
      }
    },

    async getRecordData(){
      return await getRecordById(this.$route.params.id);
    },
    selectStatus(isNew) {
      if(isNew === true) {
        return true;
      } else {
        return false;
      }
    },
    backgroundColor(isNew) {
      if(isNew === true) {
        return "#f2f2f2";
      }
    },
    fileUrl(filename){
      let host = process.env.VUE_APP_IMAGE_DOMAIN;
      //let host = backend.replace("api", "");

      return host+filename;
    },
    isNew(isNewRecord){
      if(isNewRecord == false){
        return "hide";
      }
      return "";
    },
    isUrl(is_url = 1,file = null){
      if(file == null) {
        if (is_url === 0) {
          return  " hide";
        }
      } else {
        if (is_url === 1) {
          return  " hide";
        }
      }
      return "";
    },
    selectDevice(rowId, selectedID){
      for (let i = 0; i < (this.devices_list).length; i++) {
        if(this.devices_list[i]["id"] === selectedID){
          var items  = document.getElementsByClassName("vr_url-"+rowId);
          var files  = document.getElementsByClassName("vr_file-"+rowId);
          if(this.devices_list[i]["is_url"] == 0){
            for(var j = 0; j < items.length; j++)
            {
              items[j].className += " hide";
              files[j].className = "fileOrURL col-sm-5 col-12 vr_file-"+rowId;
            }
          } else {
            for(var k = 0; k < items.length; k++)
            {
              items[k].className = "fileOrURL col-sm-5 col-12 vr_url-"+rowId;
              files[k].className += " hide";
            }
          }
        }
      }
    },
    filterDevice(id){
      //console.log(id);
      //console.log(this.versionLog);
      this.filterDev = id;
      let newVersionLog = [];
      (this.sourceVersionLog).forEach(function (v) {
        if(id === v.devices_id){
          newVersionLog.push(v);
        }
      });

      this.versionLog = newVersionLog;
    },
    addDoc()
    {
      this.creationForm.devices.push({ name: '' , new: true });
      this.creationForm.devices_version.push({ version: '' });
      this.creationForm.devices_download.push({ url: '' });
    },
    getHours: function (){
      let arr = [];
      for (let i = 0; i < 24; i++) {
        arr.push( ('0' + i).slice(-2) );
      }
      return arr
    },
    getMin: function (){
      let arr = [];
      for (let i = 0; i < 60; i++) {
        arr.push( ('0' + i).slice(-2) );
      }
      return arr
    },
    backAction: function(){
        //this.$router.push({name: 'BaseFrame'})
      if(this.isNewRecord === false) {
        this.$router.push({name: 'view-record', params: {id: this.$route.params.id}})
      } else {
        this.$router.push({name: 'trainings'})
      }
    },
    displayDateTime : function (mysqlDateTime, type = "short") {
      let time = moment(mysqlDateTime).format(store.state.options.displayDateFormat)
      if (type == "long") {
        time = moment(mysqlDateTime).format(store.state.options.displayFullDateTimeFormat)
      }
      return time
    },
    async confirmUpdateDevice(RecordDevice_id, index)
    {

      let recordID = this.$route.params.id;
      let device_id = ((this.creationForm.devices)[index]).name;
      let version = ((this.creationForm.devices)[index]).version;
      let url = ((this.creationForm.devices)[index]).url;
      let file = ((this.creationForm.devices)[index]).file;

      console.log(recordID);console.log(RecordDevice_id);console.log(device_id);console.log(version);console.log(url);console.log(file);

      var bodyFormData = new FormData();
      bodyFormData.append('recordID', recordID);
      bodyFormData.append('RecordDevice_id', RecordDevice_id);
      bodyFormData.append('device_id', device_id);
      bodyFormData.append('version', version);
      bodyFormData.append('url', url);
      bodyFormData.append('file', file)
      bodyFormData.append('userID', this.userID);

      await axios({
        method: "post",
        url: process.env.VUE_APP_API_DOMAIN+"/v2/updateRecordDevice",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

      //this.$router.go(this.$router.currentRoute);
      this.$noty.success(this.$t("records.updateRecordSuccess"));

      let record = await this.getRecordData();
      if( ((record.data.result.records_versionlogs).length) > 0 ) {

        let updatedLog = record.data.result.records_versionlogs;
        this.sourceVersionLog =  updatedLog;

        let newVersionLog = [];
        (this.sourceVersionLog).forEach(function (v) {
          if(device_id === v.devices_id){
            newVersionLog.push(v);
          }
        });

        this.versionLog = newVersionLog;

        this.defaultSelected = {
          id : device_id
        }

      }

    },
    async submitHandler() {

      console.log(this.creationForm);
      //let devicesObj = JSON.parse(JSON.stringify(this.creationForm.devices));
      //console.log(devicesObj);

      this.loading = true;
      this.errors = [];
      let pass = true;
      let passScreen = true;

      if (!(this.creationForm.record_title)) {
        this.errors.push(this.$t("records.record_title_req"));
        pass = false;
      }

      if((this.creationForm.description)) {
        if ((this.creationForm.description).match(/(\w+)/g).length > 150) {
          this.errors.push(this.$t("records.description_tooLong"));
          pass = false;
        }
      }

      let countScreen = 0;
      (this.creationForm.screenshot).forEach(function (v2) {
        if( v2.size > 2000000) {
          passScreen = false;
        }
        countScreen ++;
      })

      if(countScreen > 5){
        this.errors.push(this.$t("records.file_tooMany"));
        pass = false;
      }

      if(passScreen === false){
        this.errors.push(this.$t("records.file_tooLarge"));
        pass = false;
      }

      if (pass === true) {

        var bodyFormData = new FormData();
        var i = 0;
        (this.creationForm.devices).forEach(function (v) {
          bodyFormData.append('i'+i, v.file);
          i++;
        });

        bodyFormData.append('record_id', this.$route.params.id);
        bodyFormData.append('training_record_name',this.creationForm.record_title);
        bodyFormData.append('company_name',this.creationForm.contractor_company);
        bodyFormData.append('publish_date',this.displayDateTime(this.creationForm.publish_date));
        bodyFormData.append('publish_time',this.creationForm.publish_hour + ":" + this.creationForm.publish_min);
        bodyFormData.append('description',this.creationForm.description);
        bodyFormData.append('isNewRecord',this.isNewRecord);
        bodyFormData.append('devices',JSON.stringify(this.creationForm.devices));
        bodyFormData.append('userID', this.userID);

        (this.creationForm.screenshot).forEach(function (v2) {
          if( v2.size < 2000000) {
            bodyFormData.append('screenshots', v2);
          }
        });


        /** Handle thumbnail **/
        if(this.NewThumbnail !== null){
          if (typeof (this.NewThumbnail) !== 'undefined') {
            if( (this.NewThumbnail).length === 0 ){
              //No new thumbnail found.
            } else {
              console.log("Update thumbnail");
              bodyFormData.append('thumbnail', this.NewThumbnail);
            }
          }
        }
        /***********************/


        if (this.isNewRecord === false) {
          // update record
          // let response = await updateRecord({
          //   record_id: this.$route.params.id,
          //   training_record_name: this.creationForm.record_title,
          //   company_name: this.creationForm.contractor_company,
          //   publish_date: this.displayDateTime(this.creationForm.publish_date),
          //   publish_time: this.creationForm.publish_hour + ":" + this.creationForm.publish_min,
          //   description: this.creationForm.description,
          //   devices : devicesObj
          // });

          await axios({
            method: "post",
            url: process.env.VUE_APP_API_DOMAIN+"/v2/updateRecord",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (response) {
            console.log(response);
          });

          this.$router.push({name: 'trainings'})
          this.$noty.success(this.$t("records.updateRecordSuccess"));

        } else {

          //create record
          // let response = await createRecord({
          //   training_record_name: this.creationForm.record_title,
          //   company_name: this.creationForm.contractor_company,
          //   publish_date: this.displayDateTime(this.creationForm.publish_date),
          //   publish_time: this.creationForm.publish_hour + ":" + this.creationForm.publish_min,
          //   description: this.creationForm.description,
          //   devices: JSON.parse(JSON.stringify(this.creationForm.devices))
          // });
          //console.log(response);

          await axios({
            method: "post",
            url: process.env.VUE_APP_API_DOMAIN+"/v2/createRecord",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              console.log(response);

            })
            .catch(function (response) {
              console.log(response);
            });

            this.$noty.success(this.$t("records.createRecordSuccess"));
            this.$router.push({name: 'trainings'})
        }
      }

      this.loading = false;

    },
    OpenDeleteImageDialog (i) {
      this.confirmDelete = true
      this.selectedImage = this.galleryIndex[i];
      this.selectedIndex = i;
    },
    CloseDeleteImageDialog () {
      this.confirmDelete = false
    },
    async confirmDeleteImg(){
      this.confirmDelete = false

      //console.log(this.selectedImage );
      //console.log(this.gallery );
      //console.log(this.selectedIndex );

      let res = await deleteScreenShot(this.selectedImage);
      console.log(res);


      for (var key in this.gallery ) {
        if (key == this.selectedIndex ) {
          this.gallery .splice(key, 1);
        }
      }

      this.$noty.success(this.$t("records.ScreenShotDeleted"));
    },
    displayThumbnail : function (item){

      let host = process.env.VUE_APP_IMAGE_DOMAIN;
      //let host = backend.replace("api", "");
      let avatar = host+item;

      return "background: url('"+avatar+"')";
    },

    addFile : function (index){

      var dev_file  = "dev-file-"+index;
      let ele =  document.getElementById(dev_file);

      ele.click();

    },

    uploadFile(index){

      var element = document.getElementById("dev-ele-"+index);
      var fileBox = element.getElementsByClassName("v-file-show");
      var uploadButton = element.getElementsByClassName("add_file-btn")[0];

      if( typeof (this.creationForm.devices[index].file) !== "undefined" && (this.creationForm.devices[index].file) != null){
        fileBox[0].className = " v-file-show";
        uploadButton.className += " hide";
      } else {
        fileBox[0].className += " hide";
        uploadButton.classList.remove("hide");
      }

    },

    resetPage (){
      this.$router.go(this.$router.currentRoute);
    },
    displayLogAvatar (url){
      let host = process.env.VUE_APP_IMAGE_DOMAIN;

      //let host = backend.replace("api", "");
      let avatar = host + url;

      return "background: url('"+avatar+"')";
    }
  },
};
</script>

<style scoped>
.page-header{
  text-align: left;
  padding-left: 40px;
  margin-bottom: 20px;
}


.login-title {
  font-size: 28px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  padding: 0;
  padding-top: 20px;
  display: inline-block;
}

#RecordForm .form-input-box {
  font-size: 28px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}


.v-text-field--outlined.v-input--is-focused fieldset {
  border: 1px solid #d0d0d0;
}

.record-reset-btn{
  font-size: 15px !important;
  color: #979797 !important;
  width: 120px;
  background-color: white;
  border: 1px solid #979797;
  border-radius: 27px;
  padding: 16px !important;
  height: 54px !important;
  margin: 50px 10px 50px 50px;
}

.record-reset-btn svg{
  margin-right: 10px;
  zoom: 0.9;
}

.record-save-btn {
  font-size: 15px !important;
  color: white !important;
  width: 120px;
  background-color: #9fcb3d;
  border: 1px solid #7ed321;
  border-radius: 27px;
  padding: 16px !important;
  height: 54px !important;
  margin: 50px
}


.login-error {
  text-align: left;
  width: 270px;
  margin: 0 auto;
  color: red;
  font-size: 12px;
}

.label-left{
  text-align: left;
  margin: 0 45px;
  font-weight: bold;
  margin-bottom: 10px;
}


.form-container{
  padding :0;
  margin-top:0;
}

.published-container{
  margin-top: 15px;
}


@media(max-width: 500px) {
  .label-remark{
    display: block;
    float: none !important;
  }
}

@media(max-width: 700px) {
  .record-save-btn{
    margin: 0 0 30px 30px!important;
  }

  .record-reset-btn{
    margin: 20px 0 50px 50px !important;
  }

  .v-text-field--enclosed{
    margin: 20px !important;
  }
}



.form-input-box{
  padding-left: 5px !important;
  padding-right: 5px !important;
}


.datetimepicker .datepicker{
  bottom: auto !important;
}


#RecordForm .v-text-field input{
  padding: 24px 0;
}

.view-record-desc-container{
  padding: 0 47px !important;
  min-height: 200px;
}

.view-record-desc-container .label-left{
  margin: 0;
}

@media(max-width: 700px) {
  .published-container .date-time-picker{
    margin-left : 25px;
  }

  .label-left{
    margin: 0 25px !important;;
  }

  .view-record-desc-container{
    padding: 0 25px !important;
  }

  .devices-container{
    width: 90% !important;
  }

  .devices-container .v-input{
    width: 80% !important;
  }

  .devices-container{
    margin: 20px 20px !important;
  }

  .add_package{
    padding-left: 15px !important;
  }

  .v-file-show{
    width: 100% !important;
  }

  .screenshot-view{
    padding: 30px 25px !important;
  }

  .vlog-container{
    margin: 20px 30px !important;
  }
  .page-header{
    padding-left: 10px !important;
  }
}

#RecordForm .v-input__control{
  height: 45px;
}

.desc-title{
  font-weight: bold;
}

.devices-container{
  border: 1px solid #d2d2d2;
  margin: 20px 50px;
  padding: 20px 0;
  border-radius: 8px;
  width: 90%;
}
.add_package{
  text-align: left;
  padding-left: 45px;
}

.devices-container .v-input{
  width: 100%;
  display: inline-block;
}



.add_package button{
  border: 2px solid #9FCB3D;
  border-radius: 30px;
  width: 160px;
  height: 50px;
  color: #9FCB3D !important;
  padding: 25px 0 !important;
  font-weight: bold;
  box-shadow: none !important;
}

.confirm-device{
  margin-top: 30px;
}

.confirm-device button{
  color: white !important;
  background: #9FCB3D !important;
  border: 1.1px solid #9FCB3D;
  box-sizing: border-box;
  border-radius: 26.9134px;
}


.screenshot-container{
  padding: 10px;
  margin-bottom: 20px;
}

.screenshot-view{
  padding: 30px 50px;
}

.gallery-thumbnail{
  width: 100px;
  height: 100px;
  vertical-align: middle;
  top: 50%;
  position: relative;
  transform: translateY(-50%);
  object-fit: contain;
  cursor: pointer;
}

.vlog-container{
  padding-top: 20px;
  margin: 20px 50px;
  border-radius: 10px;
  border: 1px solid #E9E9E9;
  box-shadow: 0px 0px 10px #E8E8E8;
}

.vlog-table{
  margin: 30px 20px 20px 20px;
}

.vlog-header{
  color: #324E4F;
  font-weight: bold;
  font-size: 14px;
}

.each-log{
  border-top: 1px solid #d0d0d0;
  padding: 13px 0;
}

.devices-filter-container{
  padding: 0 10px;
  margin: 20px 0;
}




.screenshot-delete{
  position: absolute;
  top: -10px;
  right: 0px;
  padding: 2px;
  border-radius: 50%;
  color: white;
  width: 30px;
  text-align: center;
  z-index: 1000;
  cursor: pointer;
}

.confirm-dialog-container{
  padding: 8px;
  background-color: white;
}
.confirm-dialog-container .confirm-dialog{
  min-height: 90px;
}
.confirm-dialog-container .confirm-dialog .btn-group{
  margin-top: 20px;
}

.record_thumbnail{
  margin-bottom: 10px;
}

.record_thumbnail img {
  width: 210px;
  height: 150px;
}

.vr-container{
  padding-left: 15px;
}



.add_file-btn{
  border: 1px solid #324E4F;
  color: #324E4F;
  font-weight: bold;
  padding: 27px 30px !important;
  margin-bottom: 10px;
  border-radius: 10px;
  margin-left: 40px;
}
.add_file-btn svg{
  margin-right: 10px;
  zoom: 0.9;
}



.edit-form-container{
  margin-bottom: 20px;
}

.thumbnail_icon{
  width: 210px;
  height: 150px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: -7px;

  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
}

.vlog-data{
  text-align: left;
  padding-left: 10px !important;
}

.vlog-title{
  margin-bottom: 20px;
}

.vlog_avatar{
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
  background-size: cover !important;
  margin-right: 10px;
  margin-bottom: -7px;
}

.default-avatar{
  background-image: url("~@/assets/default_avatar.png");
}

.training-description-title{
  text-align: left;
  font-weight: bold;
}

.screenshot_upload_box{
  margin-top: 30px;
  width: 486px;
  height: 113px;
  border: 1.31726px dashed #CCCCCC;
  border-radius: 10px;
  margin-left: 50px;
  text-align: left;
  padding: 15px 20px;
  cursor: pointer;
}

@media(max-width: 620px) {
  .screenshot_upload_box{
    width: 280px;
    height: 170px;
    margin-left: 25px;
    padding: 15px 0;
  }

  .upload_box_title1 {
    margin-top: 10px;
    font-size: 17px !important;
  }

  .upload_box_title2, .upload_box_title3{
    font-size: 13px !important;
  }

}

.upload_box_title1{
  color: #324e4f;
  font-weight: bold;
  font-size: 20px;
}

.upload_box_title2{
  color: #cccccc;
  font-size: 14px;
}

.upload_box_title3{
  color: #cccccc !important;
  font-size: 14px;
}

</style>


<style>
.v-card__actions {
  padding: 0 !important;
  justify-content: center;
}

.year-month-selector, .year-month-selector{
  height: 50px !important;
}

.datetime-field .week-days{
  height: 10px !important;
  padding : 0 !important;
}

.datetime-field .flex-direction-column{
  min-width: 0 !important;
  width: 260px !important;
}


.view-record-desc-container  .v-text-field__slot {
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  background-color: #f8f8f8;
  padding: 7px;
}

.published-container .date-time-picker{
  margin: 0 45px 20px 45px;
  width: 80%;
}

.devices-container .v-input__prepend-outer{
  display: none;
}
.fileOrURL{
  padding-right: 30px !important;
}

.v-file-input .v-text-field__slot{
  min-height: 60Px;
}

.screenshot-container .v-card{
  position: relative;
}
.confirm-dialog-container .confirm-dialog .v-btn{
  margin: 0 8px;
}

.v-card__actions {
  padding: 0 !important;
}

#RecordForm .v-text-field.v-text-field--enclosed , .form-input{
  margin: 0 40px;
}

.fileOrURL .v-text-field.v-text-field--enclosed{
  margin-left: 40px !important;
}

.hide{
  display:none !important;
}


.v-stepper__content{
  padding: 24px 50px 16px 50px;
}

.label-remark{
  float: right;
  font-weight: normal;
  color: gray;
}

.pa-2{
  border:none !important;
  box-shadow: none !important;
}
</style>
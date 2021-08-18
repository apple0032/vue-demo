<template>
    <v-card
        outlined
        :class="cardCss"
        style="box-shadow: 0 0 10px 0 #e8e8e8; !important;"
        >
        <router-link :to="`/record/${item.id}`">
            <v-img class="record-card-image" height="180px" :src="item.thumbnail"></v-img>
            <div>
                <div class="record-card-title">{{title}}</div>
            </div>
            <div>
                <div class="record-support-devices">{{$t("trainingList.supportedDevices")}} :
                  <v-tooltip bottom v-if="(isOculus === true)">
                    <template v-slot:activator="{ on, attrs }">
                      <span color="primary" dark v-bind="attrs" v-on="on">
                        <img src="@/assets/oculus.png">
                      </span>
                    </template>
                    <span>Oculus Quest/Quest 2 , Oculus Go , Oculus Rift / Rift S</span>
                  </v-tooltip>

                  <v-tooltip bottom v-if="(isOther_device === true)">
                    <template v-slot:activator="{ on, attrs }">
                      <span color="primary" dark v-bind="attrs" v-on="on">
                        <img src="@/assets/other-devices.png">
                      </span>
                    </template>
                    <span>Lenovo Mirage Solo , HTC VIVE/VIVE Pro , PC</span>
                  </v-tooltip>
                </div>
            </div>
            <div>
                <div class="record-card-date">
                    <div class="record-date">{{$displayDateTime(this.item.created_at)}}</div>
                  <div class="record-creator">
                    <span class="creator-avatar" v-if="(this.creatorAvatar != null)">
                      <img :src="this.creatorAvatar">
                    </span>
                    <span class="creator-name">
                      {{this.creator}}
                    </span>
                  </div>
                </div>
            </div>
        </router-link>
    </v-card>
</template>
<script>
import _ from 'lodash'
export default {
    name: 'ListingCard',
    props: {
        item: Object
    },
    created(){
        this.title = this.item.training_record_name_en
        if(this.$i18n.locale == "zh"){
            this.title = this.item.training_record_name_zh
        }

        //let screenShots = JSON.parse(JSON.stringify(this.item.records_screenshots));
        let thumbnail;

        if(this.item.thumbnail != null){
          thumbnail = this.item.thumbnail;

          let host = process.env.VUE_APP_IMAGE_DOMAIN;
          //let host = backend.replace("api", "");
          thumbnail = host+thumbnail;

          //console.log(thumbnail);
          this.item.thumbnail = thumbnail;
        } else {
          this.item.thumbnail = "";
        }

        //var tempArr = [];

        let oculus = false;
        let others = false;
        if( (this.item.records_devices).length > 0 ){
          (this.item.records_devices).forEach(function (v) {
            if(v.device.icon === "oculus"){
              oculus = true;
            }
            if(v.device.icon === "other"){
              others = true;
            }
          });
        }

        if(oculus === true) {
          this.isOculus = true;
        }
        if(others === true) {
          this.isOther_device = true;
        }

        if(this.$i18n.locale == "zh"){
          this.creator = this.item.user.user_info.contact_person_zh
        } else {
          this.creator = this.item.user.user_info.contact_person_en
        }

        if(this.item.user.user_info.user_avatar !== null){
          let host = process.env.VUE_APP_IMAGE_DOMAIN;
          
          //let host = backend.replace("api", "");

          this.creatorAvatar = host+this.item.user.user_info.user_avatar;
        }

        //console.log( this.creator);
    },
    watch:{
        "$i18n.locale":function(){
            if(this.$i18n.locale == "zh"){
                this.title = this.item.training_record_name_zh
                this.creator = this.item.user.user_info.contact_person_zh
            } else {
                this.title = this.item.training_record_name_en
                this.creator = this.item.user.user_info.contact_person_en
            }
        }
    },
    data(){
        return {
            title: "",
            isOculus : false,
            isOther_device : false,
            creator : "",
            creatorAvatar : null
        }
    },
    computed: {
        cardCss: function(){
            let cssClass = "record-card ma-0 pa-0"
            if(_.isEmpty(this.item.Version)){
                cssClass+=" disabled"
            }
            return cssClass
        }
    },
}
</script>
<style lang="scss">
.record-card{
    min-height: 280px;
}
.record-card a{
    text-decoration: none;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    
    &:hover:after {
        position: absolute;
        content: "→";
        right: 10px;
        bottom: 0;
        color: #9fcb3d;
        font-size: 28px;
    }
}
// .record-card:hover{
//     border: 1px solid #9fcb3d !important;
// }
.record-card-image .v-image__image--cover{
    background-size: cover;
    background-color: transparent;
}
.record-card-title{
    text-align: left;
    padding-left: 10px;
    font-size: 17px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #324e4f;
    padding-top: 10px;
}
.record-card-date{
    width: 100%;
    text-align: left;
    opacity: 1;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #222222;
    padding-top: 16px;
    padding-bottom: 5px;
    position: absolute;
    bottom: 0;
    left: 14px;

    &:before{
        content: url('~@/assets/icon-publish.svg');
    }
}
.record-date{
    display:inline;
    padding-left: 5px;
}

.record-card.disabled{
    background-color: white;
}
.record-card.disabled .record-card-image{
    opacity: 1;
}
</style>

<style>
.record-support-devices{
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #324e4f;
  margin-top: 10px;
  padding-left: 10px;
}

.record-support-devices img{
  width: 15px;
  height: 15px;
  margin-right: 5px;
}

.record-creator{
  display: inline-block;
  float: right;
  margin-right: 20px;
}

.creator-avatar img{
  width: 18px;
  height: 18px;
  border-radius: 50%;
}

.creator-name{
  font-size: 14px;
}
</style>
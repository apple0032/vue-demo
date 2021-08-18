<template>
 
  <v-app style="background-color: #F8FAF7">
    <v-container fluid class="mx-0 pa-0" style="height: 100%;">
      <router-view/>
    </v-container>
  </v-app>
</template>
<script>
export default {
  watch: {
    '$route' (to) {
      let title = "";
      if(to.meta.title == "" || to.meta.title === undefined){
        title = "CSW 2020"
      } else {
        title = to.meta.title + " | CSW 2020" 
      }

      document.title = title
    }
  },
}
</script>

<style lang="scss">
@import url("https://fast.fonts.net/t/1.css?apiType=css&projectid=25d2fe2d-c2a7-4109-bc08-8b2fbc236363");
@font-face{
    font-family:"Avenir-Medium";
    src:url("~@/fonts/17b90ef5-b63f-457b-a981-503bb7afe3c0.woff2") format("woff2"),url("~@/fonts/c9aeeabd-dd65-491d-b4be-3e0db9ae47a0.woff") format("woff");
}
@font-face{
    font-family:"Avenir-Heavy";
    src:url("~@/fonts/d513e15e-8f35-4129-ad05-481815e52625.woff2") format("woff2"),url("~@/fonts/61bd362e-7162-46bd-b67e-28f366c4afbe.woff") format("woff");
}
@font-face{
    font-family:"Avenir-Black";
    src:url("~@/fonts/c78eb7af-a1c8-4892-974b-52379646fef4.woff2") format("woff2"),url("~@/fonts/75b36c58-2a02-4057-a537-09af0832ae46.woff") format("woff");
}
#app {
  font-family: Avenir-Medium, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

//Color
:root {
  --apple-green: #7ed321;
  --sap-green: #5e9c1a;
  --light-olive-green: #9fcb3d;
  --light-blue-grey: #ced1d2;
  --opacity-fill: rgba(0, 0, 0, 0.3);
  --white: #ffffff;
  --fill-primary-lite: #e2ecff;
  --fill-grey-1: #475f7b;
  --fill-primary: #5a8dee;
  --green: #43aa8b;
  --red: #f02323;
  --dark-grey-blue: #324e4f;
  //unamed in zeplin
  --outline-secondary-grey: #e4e5eb;
}

//General
#app {
  .v-text-field input{
    font-size:14px;
    padding:6px 0;
    color:var(--fill-grey-1);
  }
  .v-text-field--outlined {
    fieldset{
      border-color: var(--outline-secondary-grey);
    }
    .v-icon.mdi-close{
      font-size:21px;
    }
  }
  .download-btn{
        width: 150px;
        height: 50px;
        font-size: 14px;
        font-weight: 900;
        padding: 16px 34px;
        border-radius: 27px;
        background-color: #9fcb3d !important;
        border: 1px solid #7ed321;
        color: white;
        cursor: pointer;
        box-shadow:none;
        &:hover{
            background-color: #5e9c1a !important;
        }
        &.disabled{
            border: solid 1px rgba(151, 151, 151, 0.26) !important;
            background-color: #efefef !important;
            cursor: not-allowed !important;
        }
  }

  .theme--light.v-select .v-select__selection{
    font-size:14px;
    color:var(--fill-grey-1);
  }
  .theme--light.v-sheet--outlined{
    border:none !important;
    box-shadow:0 0 0 1px rgba(#979797,.21);
    &:hover{
      box-shadow:0 0 0 2px var(--light-olive-green);
    }
  }
  .theme--light.v-text-field > .v-input__control > .v-input__slot:before{
    border-color: transparent;
  }
  .v-input.filter-dropdown{
    width:140px;
    margin-top:0;

    .v-input__prepend-inner .v-icon{
      color: var(--light-olive-green);
    }
    .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
      color: var(--fill-grey-1);
    }
  }
  .v-list-item__title{
    text-align:left;
  }
  .v-menu__content{
    //box-shadow: 0 0 0 1px rgba(#c7cfd6,0.5) !important;
    box-shadow: none;
  }

  //card
  .v-sheet.v-card:not(.v-sheet--outlined){
    box-shadow: 0 0 10px 0 #e8e8e8;
  }
  .theme--light.v-card.v-card--outlined:hover{
    box-shadow: 0px 0px 5px 2px rgb(126 211 33 / 20%) !important;
  }

  .theme--light.v-pagination{
    color: #878787;
    .v-pagination__item{
      box-shadow:none;
    }
    .v-pagination__item--active{
      pointer-events:none;
    }
    .v-pagination__navigation--disabled{
      opacity:0.5;
    }
  }

  //Button
  .v-btn--contained{
    box-shadow:none;
  }
  .theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
    background-color:transparent;
  }
  .create-record{
    float: right;
    a{text-decoration: none;}
  }
  .create-record-btn, .cic-btn--secondary{
    width: 170px;
    color: white;
    background-color: #9fcb3d;
    border-radius: 27px;
    margin-left: 27px;
    font-weight: 900;
    font-size: 15px;
    line-height:33px;
    font-family: Avenir-Heavy, Helvetica, Arial, sans-serif;
    &:hover{
      background-color: #5e9c1a;
    }
  }
}

//Login Form
#app .v-form{
  .v-card{ border-radius:5.5px;}
  div{

      color:var(--dark-grey-blue);
  }
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot{
    box-shadow: 0 0 0 0.6px #d0d0d0;
    border:10px;
    border-radius: 11px;
  }
  .theme--light.v-input input, 
  .theme--light.v-input textarea{
      color: var(--dark-grey-blue);
      font-size: 14px !important;
      font-weight: bold;
  }
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details{
    padding: 0 21px;
    margin-bottom: 3px;
  }
  .v-text-field.v-text-field--solo .v-input__control{
    min-height: 55px;
    
  }
  .v-input.login-password > .v-input__control > .v-input__slot{
      background-color: #eaede5;
  }
  .v-list-item__content{
      padding: 18px 0;
  }
  .v-input.login-keep-signed-in .theme--light.v-label{
    font-size: 13px;
    color:#787e8c;
    

  }

  .theme--light.v-btn.login-btn{
    font-family: Avenir-Medium, Helvetica, Arial, sans-serif;
    font-size: 16.5px;
    font-weight: 900;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.1px;
    color: var(--white);
    flex: 0 1 auto;
    width: 100%;
    height: 55px;
    border-radius: 26.9px;
    border: solid 1.1px var(--apple-green);
    background-color: var(--light-olive-green);
    margin: 14px 45px 21px;    
  }
  .login-forgot-password{
    font-family: Avenir-Medium, Helvetica, Arial, sans-serif;
    font-size: 13.1px;
    font-weight: 900;
    color: var(--dark-grey-blue);
    margin-bottom: 21px;
  }
}
//Listing
#app .records-container{
  margin: 7px 42px;
}
#app .search-filter-container{
  margin: 0 42px;
  padding-top: 30px;
}
#app .search-field{
  width: 303px; 
  display:inline-block; 
  left:0; 
  position: relative;
  border-radius: 10px !important;
}
#app .search-button-image{
  width: 38px;
  height: 33px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 9px;
  cursor: pointer;
  background-image: url('~@/assets/icon-search.svg');
  &:hover{
    background-image: url('~@/assets/icon-search.svg');
  }
}
#app .filter-button-image{
  width: 38px;
  height: 33px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  background-image: url('~@/assets/icon-filter.svg');
  &:hover{
    background-image: url('~@/assets/icon-filter-hover.svg');
  }
}

#app .menu-filter-button-image{
  position: absolute;
  width: 20px;
  height: 20px;
  margin-left: 36px;
  //margin-top: 26px;
  vertical-align: middle;
  background-image: url('~@/assets/icon-menu-filters.svg');
  background-size: 20px 20px;
}


#app .menu-filter-title-font{
  position: absolute;
  width: 130px;
  height: 33px;
  left: 68px;
  top: 20px;

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;
  /* identical to box height */

  letter-spacing: 0.960337px;
  text-transform: uppercase;

  /* CIC Green */

  color: #9FCB3D;
}



#app .menu-filter-cancel-button-image{
  //position: absolute;
  width: 24px;
  height: 24px;
  margin-left: 332px;
  margin-top: 26px;
  vertical-align: middle;
  background-image: url('~@/assets/icon-cancel.svg');
  background-size: 24px 24px;

}


//Gallery plugin
#app .vgs{
  .vgs__prev, .vgs__next{
    font-size:140px;
    width:70px;
    height:auto;
    width: auto;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 14px;
    opacity: 0.5;
  }
  .vgs__close{
    font-size:70px;
    right:14px;
  }
  .vgs__container{
    height: calc(100% - 160px);
  }
}

@media(max-width: 700px) {
  .vgs__container {
    top: 20% !important;
  }
}

#app .layout-main{
  display:inline-flex;
  width:100%;
  /*background-color:#F8FAF7;*/
  /* background-color: red; */
}

#app .left-menu-font{
  position: static;
  height: 19px;
  left: 0%;
  right: 19.5%;
  top: calc(50% - 19px/2);
  width: 100%;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.960337px;
  text-transform: uppercase;
  color: #324E4F;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 24px;
  text-align: left;
}

#app .left-menu-data-font{
  position: static;
  width: 200px;
  height: 19px;
  left: 32px;
  top: 0px;

  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.960337px;
  text-transform: uppercase;
  color: #324E4F;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin-top: 24px;
}

#app .v-sheet.v-card{
  box-shadow: 0px 0px 5px 2px rgb(126 211 33 / 20%);
}

.edit-form-container , .record-form-container , .login-form-container , .registration-form-container , .admin-registration-form-container{
  box-shadow: 0px 0px 5px 2px rgb(126 211 33 / 20%) !important;
}

.login-error li{
  list-style-type: disc;
}

.login-error{
  margin-bottom: 10px !important;
}
</style>

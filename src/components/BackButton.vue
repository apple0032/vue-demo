<template>
    <v-container
        :class="className"
        fluid>
        <div
            class="back-button"
            @click="backAction"
            >{{$t("generic.back")}}</div>
    </v-container>
</template>
<script>
export default {
    name: 'BackButton',
    props: {
        title: {
            type: String,
            default: ""
        },
        align:  {
            type: String,
            default: "left"
        }
    },
    data(){
        return {
        }
    },
    computed: {
        /*backTitle(){
            if(this.title == "")
                return this.$t("generic.back")
            else
                return this.title
        },*/
        className(){
            let className = "algin-"+this.align

            className += " px-0"

            return className
        },
    },
    methods:{
        backAction: function(){
            this.$emit('back-action')
        }
    }
}
</script>

<style scoped>
.algin-left{
    text-align: left;
}
.algin-center{
    text-align: center;
}
.algin-right{
    text-align: right;
}

.back-button::before{
    content: url('~@/assets/icon-back.svg');
    top: 2px;
    position: relative;
    padding-right: 5px;
}
.back-button{
    display: inline-block;
    color: #5e9c1a;
    opacity: 1;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    -webkit-transition: opacity 150ms ease-in-out;
    -moz-transition: opacity 150ms ease-in-out;
    -ms-transition: opacity 150ms ease-in-out;
    -o-transition: opacity 150ms ease-in-out;
    transition: opacity 150ms ease-in-out;
    cursor: pointer;
}
.back-button:hover{
    color: rgba(#5e9c1a,1);
}
</style>

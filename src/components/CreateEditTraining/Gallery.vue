<template>
    <div class="training-gallery-container" v-if="!isLoading">
        <v-container>
            <v-row>
                <v-col class="px-0" v-for="(file, index) in files" :key="file.id">
                    <div class="thumbnail-container">
                        <div class="thumbnail-delete-btn" @click="deleteScreenshot(index)">
                            <div class="delete-icon"></div>
                        </div>
                        <div>
                            <v-img class="screenshot-thumbnail" :src="file.blob"/>
                        </div>                        
                    </div>                    
                </v-col>                
            </v-row>
        </v-container>
        <div v-if="reachMaxUpload">
            {{$t("editTrainingDetails.reachMaximumScreenShots")}}
        </div>
        <div v-else>
            <file-upload
                class="btn btn-primary dropdown-toggle"
                :multiple="true"
                v-model="files"
                @input-filter="inputFilter"
                @input-file="inputFile"
            ref="upload">
            <v-btn
                class="add-screen-shot-btn"
            >{{$t("editTrainingDetails.addScreenShots")}}</v-btn>
            </file-upload>
        </div>
    </div>
</template>
<script>
import FileUpload from 'vue-upload-component'
import _ from 'lodash'
export default {
    name: "Gallery",
    components:{
        FileUpload 
    },
    props:{
        images:{
            type: Array,
            default: () => ([])
        },
        trainingRecordId: {
            type: Number,
            default: 0
        },
    },
    computed:{
        reachMaxUpload: function(){
            return this.files.length >= this.maxFiles
        }
    },
    async mounted() {
        this.isLoading = true

        if(!_.isEmpty(this.images)){
            let tmpFile = null
            let url = ""
            this.images.forEach(async (image) => {
                url = image.url
                let blob = await fetch(url,{
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                }).then(r => r.blob());
                tmpFile = new File([blob], "filename")
                tmpFile.id = image.id
                tmpFile.blob = URL.createObjectURL(tmpFile)
                this.files.push(tmpFile)
            })
        }

        this.isLoading = false
    },
    data(){
        return{
            test:"",
            isLoading: true,
            maxFiles: 5,
            files:[],
            newFiles: [],
            needDeleteFileIds: [],
            tmpFileCount: 0
        }
    },
    methods:{
        inputFilter(newFile, oldFile, prevent) {
            this.tmpFileCount+=1
            if((this.tmpFileCount + _.size(this.files) - 1) >= this.maxFiles){
                return prevent()
            }
            if (newFile && !oldFile) {
                // Before adding a file
                // 添加文件前
                // Filter system files or hide files
                // 过滤系统文件 和隐藏文件
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                return prevent()
                }
                // Filter php html js file
                // 过滤 php html js 文件
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                return prevent()
                }
            }
        },
        inputFile(newFile, oldFile) {
            if (newFile && !oldFile) {
                // add
                // console.log('add', newFile)
                newFile.blob = window.URL.createObjectURL(newFile.file)
                this.newFiles.push(newFile)
            }
            if (newFile && oldFile) {
                // update
                // console.log('update', newFile)
            }
            if (!newFile && oldFile) {
                // remove
                // console.log('remove', oldFile)
                // const valueToRemove = 'ggg'
                // this.newFiles = this.newFiles.filter(function(item) {
                //     return item.id !== oldFile.id
                // })
                
            }
            this.tmpFileCount = 0
            this.notifyParentComponent()
        },
        deleteScreenshot: function(fileIndex){
            let fileId = 0
            this.files = this.files.filter((file, index) => {
                if(_.isInteger(file.id) && index == fileIndex){
                    fileId = file.id
                    this.needDeleteFileIds.push(fileId)
                }
                return index !== fileIndex
            })
            if(fileId !== 0) {
                this.newFiles = this.newFiles.filter((file) => {
                    return file.id !== fileId
                })
            }
            this.notifyParentComponent()
        },
        notifyParentComponent: function(){
            this.$emit('update-screenshots', {
                newFiles: this.newFiles,
                needDeleteFileIds: this.needDeleteFileIds
            })
        }
    }

}
</script>
<style>
.vue_component__upload--image .upload_image_form__thumbnail > img:hover{
    filter: unset !important;
    -webkit-filter: unset !important;
}
.thumbnail-delete-btn{
    width: 30px;
    height: 30px;
    background-color: #9fcb3d;
    border-radius: 27px;
    display: inline-block;
    position: absolute;
    z-index: 10;
}
.thumbnail-delete-btn:hover{
    cursor: pointer;
    background-color: #5e9c1a !important;
}
.delete-icon{
    background-image: url('~@/assets/icon-delete-white.svg');
    position: relative;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    top: 50%;
    transform: translateY(-50%);
    background-size: contain;
}
.screenshot-thumbnail{
    width: 168px;
    height: 105px;
    vertical-align: middle;
    -o-object-fit: none;
    object-fit: contain;
}
.training-gallery-container{
    text-align: left;
}
.v-btn.add-screen-shot-btn{
    border-radius: 27px;
    margin: 8px;
    background-color: #9fcb3d !important;
    color:white;
    font-weight:bold;
    cursor: pointer;
}
.file-uploads:hover > .v-btn.add-screen-shot-btn{
    cursor: pointer;
    background-color: #5e9c1a !important;
}
</style>
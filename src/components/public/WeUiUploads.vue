<template>

    <div class="weui-upload">
        <div class="weui-cells weui-cells_form" style="margin: 0;">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <div class="weui-uploader">
                        <!--<div class="weui-uploader__hd">
                            <p class="weui-uploader__title">{{title}}</p>
                            <div class="weui-uploader__f">{{images.length}}/{{maxCount}}</div>
                        </div>-->
                        <!--:style="{backgroundImage:item}"-->
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" style="margin-bottom: 0;">
                                <li class="weui-uploader__file"
                                :class="{'weui-uploader__file_status':item.indexOf('base64') !== -1}"
                                 v-for="(item,index) in images">
                                    <img :src="item" @click="previewImage(index,item)"
                                         style="width:80px;height:80px;" alt="">
                                         <input type="text" class="form-control" :value="index+1" style="height: 24px;" @blur="changePos($event,index)" v-if="isSort" />
                                         <div class="weui-uploader__file-content" 
                                          v-show="item.indexOf('base64') !== -1">上传中</div>
                                </li>
                            </ul>
                            <div class="weui-uploader__input-box" v-show="images.length < maxCount">
                                <input @change="upload($event)" class="weui-uploader__input" type="file" :accept="allowTypes" :multiple="maxCount > 1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--图片预览-->
        <div class="weui-gallery" v-show="img.is_preview" @click="hidePreview">
            <span class="weui-gallery__img" :style="{backgroundImage:img.preview_url}"></span>
            <div class="weui-gallery__opr">
                <a href="javascript:" class="weui-gallery__del" @click.prevent="deleteImage(img.image_index)">
                    <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                    <span class="weui-span_del">删除</span>
                </a>
            </div>
        </div>
    </div>

    <!--DEMO-->
    <!--<we-ui-uploads :images="f.cover"
                   :maxCount="1"
                   :maxSize="1024*512"
                   :allowTypes="image/*"
                   @uploading="uploading"></we-ui-uploads>-->
</template>


<script>
    export default {
        data () {
            return {
                img: {
                    is_preview: false,
                    preview_url: null,
                    image_index: null,
                    preview_images: []
                },
                URL:URL
            }
        },
        props: {
            isSort: {
                type: Boolean,
                default:false
            },
            title: {
                type: String,
                default:'图片上传'
            },
            images: {
                type: Array,
                required: true,
                default: []
            },
            maxCount: {
                type: Number,
                default: 1
            },
            maxSize: {
                type: Number,
                default: 1024 * 1024 //单张图片大小限制默认:1024kb
            },
            allowTypes: {
                default: "image/png,image/jpeg,image/jpg"
            }
        },
        methods: {
            changePos(e,index) {
                let val = parseInt(e.target.value)//要替换的索引值
                if (val>this.images.length) {
                     return;
                }
                let newVal = this.images[index]//获取当前的元素值

                let oldVal = this.images[val-1]//获取要替换的元素值

                this.images.splice(val-1,1,newVal)//替换旧值并新增的新值
                this.images.splice(index,1,oldVal)//替换新值并新增的旧值
            },
            warning(msg) {
                if (this.$message && typeof this.$message == 'function') {
                    this.$message({
                        message: msg,
                        type: 'warning'
                    });
                } else {
                    alert(msg)
                }
            },
            uploading(e,file) {
                this.images.push(e.target.result)
                let index = this.images.indexOf(e.target.result)
                this.$emit('uploading', {
                    base64: e.target.result,
                    file: file,
                    images:this.images,
                    index:index
                })

            },
            upload(event) {

                // 允许上传的图片类型
                let allowTypes = this.allowTypes
                // 1024KB，也就是 1MB
                let maxSize = this.maxSize;
                // 最大上传图片数量
                let maxCount = this.maxCount;

                let files = event.target.files;
                let fileLength = files.length + this.images.length;
                //console.log(files)
                // 如果没有选中文件，直接返回
                if (files.length === 0)
                    return false;
                else if (files.length > maxCount || fileLength > maxCount) {
                    this.warning('最多只能上传' + maxCount + '张图片');
                    return false;
                }
                this.imgLen = files.length;
                for (let i = 0, len = files.length; i < len; i++) {
                    let file = files[i];
                    let render = new FileReader();

                    // 如果类型不在允许的类型范围内
                    if (allowTypes !== 'image/*' && allowTypes.indexOf(file.type) === -1) {
                        this.warning(`${file.name}图片类型不正确，允许上传的图片格式为${allowTypes}`);
                        continue;
                    }

                    if (file.size > maxSize) {
                        this.warning(`${file.name}图片超过${maxSize/1024}kb，不允许上传`);
                        continue;
                    }

                    render.addEventListener("load", (e) => {

                        this.uploading(e,file)

                    }, false);

                    render.readAsDataURL(file);
                }
                event.target.value=''

            },
            previewImage(index,item) {
                this.img.is_preview = true;
                this.img.preview_url = `url(${item})`;
                this.img.image_index = index;
                this.img.preview_images = this.images;
                this.$emit('previewImage', {
                    index: index,
                    images:this.images
                })
            },
            hidePreview() {
                this.img.is_preview = false;
                this.img.preview_url = null;
                this.img.image_index = null;
                this.img.preview_images = [];
                this.$emit('hidePreview')
            },
            deleteImage(index) {
                this.$emit('deleteImage', {
                    index: index,
                    images:this.images
                })

                this.images.splice(index, 1)
            }
        }
    }
</script>

<style>
    .weui-upload .weui-gallery {
        display: block;
    }
    .weui-upload .weui-span_del {
        color: #fff;
        vertical-align: middle;
    }
    .weui-upload .weui-cells:before, .weui-upload .weui-cells:after {
        border: none;
    }
    .weui-upload .weui-uploader__file {
        height: auto;
        position: relative;
    }
    .weui-upload .weui-uploader__file-content{
        font-size: 14px;
        width:45px;
        display: block;
    }
</style>

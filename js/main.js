/** 
 * 歌曲搜索
 * url:https://autumnfish.cn/search
 * method:get
 * args:keywords=歌曲名
 * response-content:歌曲搜索结果

 * 歌曲 url 获取
 * url:https://autumnfish.cn/song/url
 * method:get
 * args:id=歌曲 id
 * response-content:歌曲的 url 地址

 * 歌曲详细信息获取
 * url:https://autumnfish.cn/song/detail
 * method:get
 * args:ids=歌曲 id
 * response-content:歌曲详情，例如封面

 * 歌曲热门评论获取
 * url:https://autumnfish.cn/comment/hot?type=0
 * method:get
 * args:id=歌曲 id
 * response-content:歌曲热门评论

 * 歌曲 mv 获取
 * url:https://autumnfish.cn/mv/url
 * method:get
 * args:id=mvid
 * response-content:歌曲 mv
*/


var app = new Vue({
    el: "#player",
    data: {
        // 查询关键字
        query: "",
        // 歌曲数组
        musicList: [],
        // 单曲 url
        musicURL: "",
        // 歌曲封面
        musicCover: "",
        // 热门评论
        hotComments: [],
        // 动画播放状态
        isPlaying: false,
        // mv 遮罩层的显示状态
        isShow: false,
        // mv url
        mvURL: ""
    }, 
    methods: {
        // 歌曲搜索
        searchMusic:function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
                function(response) {
                    // console.log(response.data);
                    that.musicList = response.data.result.songs;
                }, function(err) {

                }
            );
        },
        // 歌曲播放
        playMusic:function(musicId) {
            var that = this;

            // 获取歌曲 url
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
                function(response) {
                    // console.log(response.data.data[0].url);
                    that.musicURL = response.data.data[0].url;
                }, function(err) {}
            );
            
            // 展示封面
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
                function(response) {
                    // console.log(response.data.songs[0].al.picUrl);
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function(err) {}
            );

            // 显示热门评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
                function(response) {
                    // console.log(response.data.hotComments);
                    that.hotComments = response.data.hotComments;
                }, function(err) {}
            );
        },

        // 播放与暂停
        play:function() {   
            this.isPlaying = true;
        },
        pause:function() {
            this.isPlaying = false;
        },
        
        // 播放 mv
        playMV:function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
                function(response) {
                    // console.log(response.data.data.url);
                    that.isShow = true;
                    that.mvURL = response.data.data.url;
                }, function(err) {}
            );
        },
        // 停止播放 mv
        hide:function() {
            this.isShow = false;
            this.mvURL = "";
        }

    }
})

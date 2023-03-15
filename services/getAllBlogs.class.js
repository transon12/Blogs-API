
class User{
constructor(id,username){
    this.id = id;
    this.username =username;
}
}
class Blogs{
    constructor(id,title,content,userId){
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
}
class Comments{
    constructor(id,content,userId,blogId){
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.blogId = blogId;
    }
}
class Likes{
    constructor(id,userId,blogId){
        this.id = id;
        this.userId = userId;
        this.blogId = blogId;
    }
}
function PostsDAO(db) {

    if (false === (this instanceof PostsDAO)) {
        console.log('Warning: PostsDAO constructor called without "new" operator');
        return new PostsDAO(db);
    }

    var posts = db.collection("posts");

    this.insertEntry = function (title, body, tags, author, callback) {
        console.log("inserting blog entry" + title + body);

        var permalink = title.replace( /\s/g, '_' );
        permalink = permalink.replace( /\W/g, '' );

        var post = {"title": title,
                "author": author,
                "body": body,
                "permalink":permalink,
                "tags": tags,
                "comments": [],
                "date": new Date()}

        callback(Error("insertEntry NYI"), null);
    }

    this.getPosts = function(num, callback) {

        posts.find().sort('date', -1).limit(num).toArray(function(err, items) {
             

            if (err) return callback(err, null);

            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }

    this.getPostsByTag = function(tag, num, callback) {

        posts.find({ tags : tag }).sort('date', -1).limit(num).toArray(function(err, items) {

            if (err) return callback(err, null);

            console.log("Found " + items.length + " posts");

            callback(err, items);
        });
    }

    this.getPostByPermalink = function(permalink, callback) {
        posts.findOne({'permalink': permalink}, function(err, post) {
             

            if (err) return callback(err, null);

            callback(err, post);
        });
    }

    this.addComment = function(permalink, name, email, body, callback) {

        var comment = {'author': name, 'body': body}

        if (email != "") {
            comment['email'] = email
        }

        callback(Error("addComment NYI"), null);
    }
}

module.exports.PostsDAO = PostsDAO;

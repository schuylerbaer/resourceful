from flask import Flask, request
from reviews import ReviewsDB

app = Flask(__name__)

@app.route("/reviews/<int:review_id>", methods=["OPTIONS"])
def handle_cors_options(review_id):
    return "", 204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type"
    }

@app.route("/reviews", methods=["GET"])
def retrieve_reviews():
    db = ReviewsDB("reviews_db.db")
    reviews = db.getReviews()
    return reviews, 200, {"Access-Control-Allow-Origin" : "*"}

@app.route("/reviews", methods=["POST"])
def create_review():
    print("The request data is: ", request.form)
    date = request.form["date"]
    location = request.form["location"]
    notes = request.form["notes"]
    rating = request.form["rating"]
    jams = request.form["jams"]
    db = ReviewsDB("reviews_db.db")
    db.createReview(date,location,notes,rating,jams)
    return "Created", 201, {"Access-Control-Allow-Origin" : "*"}

@app.route("/reviews/<int:review_id>", methods=["PUT"])
def update_review(review_id):
    print("update review with ID ", review_id)
    db = ReviewsDB("reviews_db.db")
    review = db.getReview(review_id)
    if review:
        date = request.form["date"]
        location = request.form["location"]
        notes = request.form["notes"]
        rating = request.form["rating"]
        jams = request.form["jams"]
        db.updateReview(review_id,date,location,notes,rating,jams)
        return "Update", 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"Review with {review_id} not found", 404, {"Access-Control-Allow-Origin" : "*"}

@app.route("/reviews/<int:review_id>", methods=["DELETE"])
def delete_review(review_id):
    print("delete review with ID ", review_id)
    db = ReviewsDB("reviews_db.db")
    review = db.getReview(review_id)
    if review:
        db.deleteReview(review_id)
        return "Delete", 200, {"Access-Control-Allow-Origin" : "*"}
    else:
        return f"Review with {review_id} not found", 404, {"Access-Control-Allow-Origin" : "*"}

def run():
    app.run(port=8080, host='0.0.0.0')

if __name__ == "__main__":
    run()

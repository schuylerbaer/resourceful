import sqlite3

def dict_factory(cursor, row):
    fields = []
    # Extract column names from cursor description
    for column in cursor.description:
        fields.append(column[0])

    # Create dictionary where keys are column names and values are row values
    result_dict = {}
    for i in range(len(fields)):
        result_dict[fields[i]] = row[i]

    return result_dict

class ReviewsDB:
    def __init__(self,filename):
        #connect to DB file
        self.connection = sqlite3.connect(filename)
        self.connection.row_factory = dict_factory

        #use the connection instance to perform db operations
        #create a cursor instance for the connection
        self.cursor = self.connection.cursor()
        return

    def getReviews(self):
        #now that we have an access point we can fetch all or one
        #ONLY applicable use of fetch is following a SELECT query
        self.cursor.execute("SELECT * FROM reviews")
        reviews = self.cursor.fetchall()
        return reviews

    def getReview(self,review_id):
        data = [review_id]
        self.cursor.execute("SELECT * FROM reviews WHERE id = ?",data)
        review = self.cursor.fetchone()
        return review

    def createReview(self,date,location,notes,rating,jams):
        data = [date,location,notes,rating,jams]
        self.cursor.execute("INSERT INTO reviews(date,location,notes,rating,jams)VALUES(?,?,?,?,?)",data)
        self.connection.commit()
        return

    def updateReview(self,review_id,date,location,notes,rating,jams):
        data = [date,location,notes,rating,jams,review_id]
        self.cursor.execute("UPDATE reviews SET date = ?, location = ?, notes = ?, rating = ?, jams = ? WHERE id = ?",data)
        self.connection.commit()
        return

    def deleteReview(self,review_id):
        data = [review_id]
        self.cursor.execute("DELETE FROM reviews WHERE id = ?",data)
        self.connection.commit()
        return


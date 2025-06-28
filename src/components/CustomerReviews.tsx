
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

interface CustomerReviewsProps {
  productId: number;
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2024-06-15",
    title: "Absolutely stunning fragrance!",
    content: "This perfume exceeded all my expectations. The rose scent is so elegant and sophisticated, not overpowering at all. It lasts throughout the day and I constantly get compliments. Will definitely repurchase!",
    helpful: 24,
    verified: true
  },
  {
    id: 2,
    author: "Emma L.",
    rating: 4,
    date: "2024-06-10",
    title: "Beautiful scent, great longevity",
    content: "I love how this fragrance develops throughout the day. The initial rose is lovely, and the musk base is very comforting. Only reason for 4 stars is that I wish it was a bit more unique, but overall very satisfied.",
    helpful: 18,
    verified: true
  },
  {
    id: 3,
    author: "Jennifer K.",
    rating: 5,
    date: "2024-06-05",
    title: "Perfect for special occasions",
    content: "This is my go-to perfume for date nights and special events. It's romantic and feminine without being too sweet. The packaging is also gorgeous - feels very luxurious.",
    helpful: 12,
    verified: false
  },
  {
    id: 4,
    author: "Maria R.",
    rating: 4,
    date: "2024-05-28",
    title: "Great quality, fast shipping",
    content: "Really happy with this purchase. The scent is exactly as described and the bottle is beautiful. Shipping was super fast and packaging was excellent. Highly recommend this seller!",
    helpful: 8,
    verified: true
  }
];

export const CustomerReviews = ({ productId }: CustomerReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', content: '' });
  const [showWriteReview, setShowWriteReview] = useState(false);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: (reviews.filter(review => review.rating === rating).length / reviews.length) * 100
  }));

  const handleSubmitReview = () => {
    if (newReview.title && newReview.content) {
      const review: Review = {
        id: reviews.length + 1,
        author: "You",
        rating: newReview.rating,
        date: new Date().toISOString().split('T')[0],
        title: newReview.title,
        content: newReview.content,
        helpful: 0,
        verified: false
      };
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, title: '', content: '' });
      setShowWriteReview(false);
    }
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-amber-100">
      {/* Reviews Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-amber-200">
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-4xl font-bold text-amber-900">{averageRating.toFixed(1)}</span>
            <div>
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating) ? 'text-amber-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-amber-700">Based on {reviews.length} reviews</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-amber-900 mb-4">Rating Distribution</h3>
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-3 mb-2">
              <span className="text-sm text-amber-700 w-8">{rating}★</span>
              <div className="flex-1 bg-amber-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-amber-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <div className="mb-8">
        {!showWriteReview ? (
          <Button
            onClick={() => setShowWriteReview(true)}
            className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Write a Review
          </Button>
        ) : (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Write Your Review</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">Rating</label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= newReview.rating 
                              ? 'text-amber-400 fill-current' 
                              : 'text-gray-300'
                          } hover:text-amber-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">Review Title</label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Summarize your experience..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-2">Your Review</label>
                  <Textarea
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    className="min-h-[100px] border-amber-200 focus:ring-amber-500"
                    placeholder="Share your thoughts about this fragrance..."
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button onClick={handleSubmitReview} className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white">
                    Submit Review
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowWriteReview(false)}
                    className="border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-amber-900">Customer Reviews</h3>
        {reviews.map((review) => (
          <Card key={review.id} className="border-amber-100">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-r from-rose-200 to-amber-200 text-amber-800">
                    {review.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-amber-900">{review.author}</h4>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-amber-600">{review.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <h5 className="font-semibold text-amber-900 mb-2">{review.title}</h5>
                  <p className="text-amber-700 mb-4 leading-relaxed">{review.content}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-amber-600 hover:text-amber-800 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

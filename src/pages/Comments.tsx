import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  id: string;
  name: string;
  comment: string;
  date: string;
  rating: number;
}

const Comments = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  // Mock comments data
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      comment: 'The Pearl Drop Earrings are absolutely stunning! The craftsmanship is exceptional.',
      date: '2024-04-15',
      rating: 5,
    },
    {
      id: '2',
      name: 'Emily Davis',
      comment: 'I love my Gold Lunar Pendant. It\'s become my everyday signature piece.',
      date: '2024-04-14',
      rating: 5,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Thank you for your comment!', {
      description: 'Your feedback helps us improve our services.',
    });

    setName('');
    setComment('');
    setRating(5);
  };

  return (
    <div className="min-h-screen bg-cream-light">
      <Helmet>
        <title>Customer Reviews | Jewels by Indra</title>
        <meta name="description" content="Read customer reviews and share your experience with Jewels by Indra's handcrafted jewelry collection." />
        <meta name="keywords" content="Jewels by Indra reviews, jewelry testimonials, customer feedback, jewelry reviews" />
      </Helmet>

      <Navbar />

      <main className="container-custom py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <MessageCircle className="w-12 h-12 text-gold mx-auto mb-4" />
            <h1 className="font-serif mb-4">Customer Reviews</h1>
            <p className="text-muted-foreground">
              We value your feedback! Share your experience with our jewelry and help others find their perfect piece.
            </p>
          </div>

          {/* Comment Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
            <h2 className="font-serif text-xl mb-6">Leave a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-1">Rating</label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>{num} Stars</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium mb-1">Comment</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold h-32"
                  placeholder="Share your experience..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Submit Review
              </button>
            </form>
          </div>

          {/* Existing Comments */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl mb-6">Recent Reviews</h2>
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{comment.name}</h3>
                    <p className="text-sm text-muted-foreground">{comment.date}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: comment.rating }).map((_, i) => (
                      <span key={i} className="text-gold">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Comments;

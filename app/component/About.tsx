import Image from 'next/image';

const About = () => {
  return (
    <div className="2xl:px-72 xl:px-48 lg:px-32 md:px-12 px-6 py-12">
      <div className="bg-primary-100  rounded-xl px-6 py-16">
        <div className="py-3 md:flex-1">
          <h1 className="font-bold text-2xl">About Us</h1>
          <p>
            We are a team of passionate individuals who are dedicated to providing the best services for our customers. Our goal is to make your experience with us as enjoyable and stress-free as possible. We take pride in our work and strive to exceed your expectations every time. We look forward to working with you and providing you with
            the best service possible.
            </p>
                </div>
                <button>
                    
                </button>
                <button className='rounded-xl p-4 bg-primary text-white'>
            <h1>Learn More</h1>
      </button>

       
      </div>
      
    </div>
  );
};

export default About;

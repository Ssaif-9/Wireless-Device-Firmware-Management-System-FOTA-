import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './navbar'

const About = () => {

    const [showLabel, setShowLabel] = useState(true);
    useEffect(() => {

        const isMobile = window.innerWidth <= 600;

        // console.log(isMobile);
        if (isMobile) {
            setShowLabel(false);
        }
    }, []);
    useEffect(() => {
        window.addEventListener('resize', () => {
            const isMobile = window.innerWidth <= 600;
            if (isMobile) {
                setShowLabel(false);
            } else {
                setShowLabel(true);
            }
        });
    });

    return (
        <>
            {showLabel && <NavBar />}
            <div className="min-h-screen0 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8">About Us</h1>
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <p className="text-gray-700 leading-relaxed">
                                We are dedicated to excellence and innovation, striving to provide our customers with the best possible solutions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit consequat mi, eget accumsan nisl consequat id. Integer fermentum, velit eget ultricies condimentum, libero dui pellentesque magna, nec malesuada ipsum mauris quis metus.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                Our commitment extends beyond mere products; it encompasses a vision to transform industries through cutting-edge technology and unparalleled service. Phasellus hendrerit arcu et lectus vehicula, vel congue ex dapibus. Donec ut neque aliquam, malesuada orci et, varius orci. Integer hendrerit elit vitae libero sollicitudin, a vestibulum ligula fermentum. Vivamus vel feugiat eros.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                At our core, we believe in fostering meaningful relationships with our clients, partners, and communities. Nulla vitae ante tincidunt, efficitur metus eu, fringilla orci. Phasellus varius mauris non lectus fringilla, nec rutrum enim placerat. Sed auctor nisi nec lectus volutpat viverra. Quisque dictum nisi in dolor tincidunt, at volutpat odio accumsan. Donec sed feugiat nunc.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default About
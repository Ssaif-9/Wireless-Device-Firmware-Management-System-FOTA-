import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Compressor from 'compressorjs';
import NavBar from './navbar'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNews = () => {
    const backendUrl = import.meta.env.VITE_URL;

    const [showLabel, setShowLabel] = useState(true);
    useEffect(() => {

        const isMobile = window.innerWidth <= 600;

        console.log(isMobile);
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
    const [news, setNews] = useState('')
    const [image, setImage] = useState()
    // const [title, setTitle] = useState('')

    const compressImage = (image) => {
        return new Promise((resolve, reject) => {
            new Compressor(image, {
                quality: 0.6,
                success(result) {
                    resolve(result);
                },
                error(err) {
                    reject(err);
                },
            });
        });
    };

    const UploadNews = async () => {
        // const data = {
        //     title: title,
        //     news: news,
        //     image: image
        // }
        console.log({"news": news, "image": image })
        const data = new FormData();
        // await data.append('title', title);
        await data.append('news', news);
        await data.append('image', await compressImage(image), image.name);

        const response = await fetch(`${backendUrl}/admin/news`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: data
        });
        if (response.ok) {
            document.getElementById('textArea').value = '';
            document.getElementById('image').value = '';
            toast.success('News added successfully',
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        }
        else {
            console.error(response)
            toast.error('Failed to add news',
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        }
    }

    return (
        <div>
            <NavBar />
            <div className='flex justify-center items-center tablet:mt-20'>
                <div className='relative tablet:w-[650px] shadow-2xl p-5 m-5 bg-white rounded-lg'>
                    <h1 className='text-center text-lg text-[#59888f] font-serif'>ADD NEWS</h1>
                    <div className='text-center justify-center items-center'>
                        <div>
                            <div>
                                <ReactQuill theme="snow" value={news} id='textArea' onChange={setNews} className='tablet:h-36 phone:h-44 phone:mb-16 tablet:mb-6 tablet:w-[600px] mx-auto' />
                                <br />
                                <input
                                    type="file"
                                    id="image"
                                    name='image'
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className='mb-[4px] text-center p-1 phone:w-[230px] phone:mx-auto tablet:w-[280px] focus:outline-none focus:border-[#2fb0b3] focus:ring-1 focus:ring-[#2fb0b3] hover:bg-[#f2f2f2] focus:bg-[#f2f2f2] focus-visible:bg-[#aaeffa] text-[#59888f]'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <input type="submit" defaultValue="Add" onClick={UploadNews} className='border-none bg-[linear-gradient(to_right,#6cd4e4_0%,#c2e9fb_51%,#51cfe2_100%)] tablet:w-[25%] flex-auto text-center uppercase transition-[0.5s] bg-[200%_auto] text-[white] shadow-[0_0_20px_#eee] cursor-pointer mt-3 p-3 rounded-br-[25px] rounded-t-[25px] rounded-bl-[25px] hover:bg-[right_center]' />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddNews;



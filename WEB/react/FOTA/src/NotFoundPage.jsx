// import notFoundimage from './assets/notfound.svg';
import notFound from './assets/creative-404-error (1).jpeg'
import notFoundimage from './assets/notfound.svg';


const NotFoundPage = () => {
    document.getElementsByTagName('body')[0].style='background-color: #ceeff4; overflow: auto;'

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center">
                <img src={notFound} className='object-center tablet:h-full tablet:w-full' alt="Not Found" />
            </div>
        </>
    )
}

export default NotFoundPage;
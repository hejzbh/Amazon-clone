import Bounce from 'react-reveal/Bounce';

const PreviewCategory = ({product}) =>{


    return (
        <Bounce left>
        <div>
            <div className="category_box">
            	<img style={{
                    width:'100%',
                    maxHeight:'70px'
                }} src={product.thumbnail}></img>
                <p style={{
                    fontSize:'15px'
                }} className="category__title__product">{product.title.split(' ').slice(0, 3).join('  ')}</p>
            </div>
        </div>
        </Bounce>
    )
}

export default PreviewCategory;
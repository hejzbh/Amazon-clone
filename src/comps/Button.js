
const Button = ({title, setCurrentPage, className}) => {


    return(
        <button className={`pagination__button ${className}`} onClick={setCurrentPage}>{title}</button>
    )
}

export default Button
export default function Input (props) {
    return (
        <>
            <label>{props.name}</label>
            <input 
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </>
    )
}
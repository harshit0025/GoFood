import React, { useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();

    let options = props.options;
    let priceOptions = Object.keys(options);

    let data = useCart();

    const [qty, setQty] = useState(1);
    const [size, setsize] = useState("");

    let foodItem = props.foodItems;

    const handleAddToCart = async () => {
        await dispatch({type: "ADD", id:foodItem._id, name:foodItem.name, price:foodItem.price, qty:qty, size:size, img:foodItem.img})
        return console.log(data);
    }

    return (
        <div>
            <div>
                <div className="card m-3" style={{ "width": "19rem", "maxHeight": "360px" }}>
                    <img className="card-img-top" src={foodItem.img} alt="Card cap" style={{height:"170px", objectFit:"fill"}} />
                    <div className="card-body ">
                        <h5 className="card-title">{foodItem.name}</h5>
                        {/* <p className="card-text">This is some important text</p> */}
                        <div className='container w-100'>

                            <select className="m-2 h-100   bg-success rounded" onChange={(e)=> setQty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className="m-2 h-100  bg-success rounded" onChange={(e)=> setsize(e.target.value)}>
                                {priceOptions.map((option)=>{
                                    return <option key={option} value={option}>{option}</option>
                                })}
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                Total price
                            </div>
                        </div>
                        <hr>
                        </hr>
                        <button className = {`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

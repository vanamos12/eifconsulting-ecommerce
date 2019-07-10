import React from 'react'

const SliderHooks = ({slides}) =>{
    const [curr, setCurr] = React.useState(0)
    const {length} = slides

    const goToNext = () =>{ 
        setCurr(curr === length - 1 ? 0 : curr + 1)
    }
    React.useEffect(() => {
        setTimeout(goToNext, 6000)
    })
    if (!Array.isArray(slides) || (slides.length <=0)){
        return null
    }
    return (
        <div className="blocCenter">
            <section className="slider">
                {
                    slides.map((s, i)=>{
                        return (
                            <div 
                                className={i===curr?"slide active":"slide"} 
                                key={s.title}
                                aria-hidden={i !== curr}>
                                <div>
                                    <h1>{s.title}</h1>
                                    <h2>{s.subtitle}</h2>
                                    <button className="btn btn-primary">{s.button}</button>
                                </div>
                                {i===curr && (
                                    <img 
                                        className="slider_image" 
                                        src={s.image}
                                        alt={`Image for ${s.title}`}/>
                                )}
                                
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}

export default SliderHooks
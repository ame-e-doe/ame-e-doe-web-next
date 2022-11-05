import "./styles.module.scss";
import imagem1 from "../../assets/imagem1.png";
import imagem2 from "../../assets/imagem2.png";
import imagem3 from "../../assets/imagem3.png";
import imagem4 from "../../assets/imagem4.png";

export default function TesteCarrossel() {

    let buttons = document.querySelectorAll('.btn');
    let imgs = document.querySelectorAll('.img');
    let currentImg = 0;
    let maxImg = imgs.length;
    
    
    buttons.forEach((button) => { 
        button.addEventListener('click', (e)=>{ 

            const isleft = e.target as HTMLTextAreaElement;
            isleft.classList.contains('left');
    
            if(isleft){ 
                currentImg -= 1;
            }else{ 
                currentImg += 1;
            }
    
            if(currentImg >= maxImg){ 
                currentImg = 0
            }
    
            if(currentImg < 0){ 
                currentImg = maxImg - 1
            }
    
            imgs.forEach((img) => { 
                img.classList.remove('current-img')
            })
            imgs[currentImg].classList.add('current-img')
    
            imgs[currentImg].scrollIntoView({ 
                behavior: "smooth",
                inline: 'center',
            })
        })
    });

  return (
    <main>
        <div className={`container`}>
            <button className={`left right`}>◀</button>
            <button className={`right btn`}>▶</button>
            <div className={`gallery-container`}>
                <div className={`gallery`}>
                    <img src={imagem1.src} className={`img current-img`} alt=""/>
                    <img src={imagem2.src} className={`img current-img`} alt=""/>
                    <img src={imagem3.src} className={`img current-img`} alt=""/>
                    <img src={imagem4.src}className={`img current-img`} alt=""/>
            </div>
            </div>
        </div>
    </main>
  );
}
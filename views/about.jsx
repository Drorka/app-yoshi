const { Fragment } = React

export function About() {

    return <Fragment>
        <h1>A little bit about us</h1>

        <section className="about">

        <div className="member">

            <img className="member-img" src="img.jpg" alt="Dror" />

            <h2>Dror</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque molestiae voluptas molestias laboriosam et dolor aliquid incidunt eos reprehenderit. Veniam!</p>
            <span className="material-symbols-outlined" scr="https://github.com/Drorka">public</span>
        </div>

        <div className="member">

            <img className="member-img" src="https://scontent.ftlv5-1.fna.fbcdn.net/v/t1.6435-9/89845142_10157310558352756_7615019858106777600_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WMUeHew7MXwAX-RsQfc&_nc_ht=scontent.ftlv5-1.fna&oh=00_AfDVQgTP2tYAP9yzRZo_qPG0YQy1Rqi0rm21B5C0Xyxa_A&oe=63D7BB8E" alt="Beta" />

            <h2>Beta</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque molestiae voluptas molestias laboriosam et dolor aliquid incidunt eos reprehenderit. Veniam!</p>
            <span className="material-symbols-outlined" scr="https://github.com/beta0022">public</span>
        </div>

        <div className="member">
  
            <img className="member-img" src="https://mario.wiki.gallery/images/e/e8/MN_Father_Day_Coupon_Printable_Yoshi_Artwork.png" alt="Yoshi" />
    
            <h2>Yoshi</h2>
            <p>The mascot and inspiration of the project. Appsus dreaming to be a Super Yoshi. During the days helps Mario, at nights helps fight against React.</p>
            <span className="material-symbols-outlined" scr="https://www.mariowiki.com/Yoshi">public</span>
        </div>


    </section>

 </Fragment>
}

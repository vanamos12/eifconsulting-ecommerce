import React, {Component} from 'react'

class MenuMobile extends Component{
    render(){
        return (
            <div className="menu menu_mm trans_300">
		<div className="menu_container menu_mm">
			<div className="page_menu_content">
							
				<div className="page_menu_search menu_mm">
					<form action="#">
						<input type="search" required="required" className="page_menu_search_input menu_mm" placeholder="Search for products..."/>
					</form>
				</div>
				<ul className="page_menu_nav menu_mm">
					<li className="page_menu_item menu_mm">
						<a href="index.html">Accueil</a>
					</li>
					<li className="page_menu_item has-children menu_mm">
						<a href="categories.html">Plans<i className="fa fa-angle-down"></i></a>
						<ul className="page_menu_selection menu_mm">
							<li className="page_menu_item menu_mm">
								<a href="#">Styles<i className="fa fa-angle-down"></i></a>
							</li>
							<li className="page_menu_item menu_mm">
								<a href="#">Formes<i className="fa fa-angle-down"></i></a>
							</li>
							<li className="page_menu_item menu_mm">
								<a href="#">&Eacute;tages<i className="fa fa-angle-down"></i></a>
							</li>
							<li className="page_menu_item menu_mm">
								<a href="#">Prix<i className="fa fa-angle-down"></i></a>
							</li>
							<li className="page_menu_item menu_mm">
								<a href="#">Compl&eacute;ments<i className="fa fa-angle-down"></i></a>
							</li>
						</ul>
					</li>
					<li className="page_menu_item menu_mm"><a href="index.html">Constructions<i className="fa fa-angle-down"></i></a></li>
					<li className="page_menu_item menu_mm"><a href="#">&Agrave; propos de nous<i className="fa fa-angle-down"></i></a></li>
					<li className="page_menu_item menu_mm"><a href="contact.html">Contact<i className="fa fa-angle-down"></i></a></li>
				</ul>
			</div>
		</div>

		<div className="menu_close"><i className="fa fa-times" aria-hidden="true"></i></div>

		<div className="menu_social">
			<ul>
				<li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
				<li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
				<li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
				<li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
			</ul>
		</div>
	</div>
        )
    }
}

export default MenuMobile
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
     const navItems = [
          {id: 1, label: "About us", href: "#about" },
          {id: 2, label: "Services", href: "#services" },
          {id: 3, label: "Our work", href: "#work" },
          {id: 4, label: "Roadmap", href: "#roadmap" },
          {id: 5, label: "FAQ", href: "#faq" }
     ]
     return (
				<div className="absolute z-50 w-full border top-5">
					<div></div>
					<nav className="absolute z-50 flex left-[50%] translate-x-[-50%] items-center justify-center text-white bg-black/50 px-12 py-6 rounded-lg box-shadow shadow-2xl">
						<ul className="flex gap-4 shrink-0">
							{navItems.map((item) => (
								<li
									key={item.id}
									className="font-bold px-4 hover:underline inline-block "
								>
									<Link href={item.href}>{item.label}</Link>
								</li>
							))}
						</ul>
					</nav>

					<div>
						<button className="transition-all ease-in border-2 cursor-pointer bg-white text-black border-white  text-md lg:text-lg font-black uppercase rounded-lg hover:rounded-4xl py-4 px-8">
							Schedule Free Consultation
						</button>
					</div>
				</div>
			)
}

export default NavBar

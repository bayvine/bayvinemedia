import Link from 'next/link'
import React from 'react'
import CTAButton from './CTAButton'
import { RxArrowTopRight } from 'react-icons/rx'
import { Icon } from './icons/Icon'

const NavBar = () => {
     const navItems = [
          {id: 1, label: "About us", href: "#about" },
          {id: 2, label: "Services", href: "#services" },
          {id: 3, label: "Our work", href: "#work" },
          {id: 4, label: "Roadmap", href: "#roadmap" },
          {id: 5, label: "FAQ", href: "#faq" }
     ]
     return (
				<div className="fixed z-50 w-full top-5 flex items-center justify-between px-15 py-7 shrink-0">
					<div>
						<span className='text-white font-[600] text-lg flex items-center gap-3'><Icon size="38" name='logo'/>Bayvine Digital Agency</span>
					</div>
					<nav className="flex items-center justify-center text-white bg-black/50 px-2 py-2 rounded-full box-shadow shadow-2xl shrink-0">
						<ul className="flex gap-4 shrink-0">
							{navItems.map((item) => (
								<li
									key={item.id}
									className="font-medium inline-block hover:bg-white hover:text-black rounded-full py-2 px-6  transition-all duration-300 cursor-pointer"
								>
									<Link href={item.href}>{item.label}</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className='shrink-0'>
							<CTAButton>
									<span className='flex items-center gap-1'>Let's Chat <RxArrowTopRight strokeWidth={0.5}/></span>
							</CTAButton>
						
					</div>
				</div>
			)
}

export default NavBar

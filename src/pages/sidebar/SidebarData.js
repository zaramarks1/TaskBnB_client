import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../service/auth.service';



const LogOut = () => {
  const navigate = useNavigate();
  authService.logout();
  navigate('/'); 
  window.location.reload();
};

export const SidebarData = [
  {
    title: 'My account',
    path: '/account',
    icon: <AiIcons.AiOutlineUser/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />
  },
  {
    title: 'Units',
    // path: '/my-units',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'My Units',
        path: '/my-units',
        icon: <AiIcons.AiFillHome />,
        cName: 'sub-nav'
      },
      {
        title: 'Create a Unit',
        path: '/add-unit',
        icon: <MdIcons.MdOutlineAddHome />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'My Request ',
    path: '/my-requests',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'My Reservations (not working)',
    path: '/myReservations',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'Messages (not working)',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Logout',
    // path: '/logout',
    onClick:{LogOut},
    icon: <IoIcons.IoMdHelpCircle />
  }
];
import { TreeNodeType } from '../types/types';

const tree: TreeNodeType[] = [
    {
        id: '1',
        title: 'US Admins',
        description: '2 voted out of 2',
        avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
        nodes: [
            {
                id: '2',
                title: 'Eyal Wiener',
                description: 'Approved a year ago',
                avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-6.jpg',
            },
            {
                id: '3',
                title: 'Jason Levi',
                description: 'Rejected a year ago',
                avatar: 'https://png.pngtree.com/element_our/png_detail/20181206/avatar-vector-icon-png_262117.jpg',
            }
        ]
    },
    {
        id: '4',
        title: 'Tel-Aviv Admins',
        description: '1 voted out of 3',
        nodes: [
            {
                id: '5',
                title: 'Offer Nissim',
                description: 'Obstained a year ago',
                avatar: 'https://st2.depositphotos.com/3369547/11386/v/950/depositphotos_113863470-stock-illustration-avatar-man-icon-people-design.jpg?forcejpeg=true',
            },
            {
                id: '6',
                title: 'Mariah Carey',
                description: 'Pending vote...',
                avatar: 'https://st2.depositphotos.com/19115378/44622/v/950/depositphotos_446224636-stock-illustration-vector-icon-cartoon-character-businessman.jpg?forcejpeg=true',
            },
            {
                id: '7',
                title: 'Sagi Kariv',
                description: 'Pending vote...',
                avatar: 'https://png.pngtree.com/element_our/png/20181206/female-avatar-vector-icon-png_262142.jpg',
                nodes: [
                    {
                        id: '8',
                        title: 'Assaf Granit',
                        description: 'Pending vote...',
                        avatar: 'https://i.ytimg.com/vi/cvVTODXUGV0/maxresdefault.jpg',
                    }
                ]
            }
        ]
    }
]

export default tree;
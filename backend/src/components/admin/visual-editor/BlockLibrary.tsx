import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

export const BLOCK_LIBRARY = [
    { 
        type: 'hero', 
        name: 'Hero Banner', 
        icon: '🎨',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'description', label: 'Mô tả', type: 'textarea' },
            { id: 'image_url', label: 'Hình ảnh nền', type: 'image' },
            { id: 'alignment', label: 'Căn lề', type: 'select', options: [
                { label: 'Trái', value: 'left' },
                { label: 'Giữa', value: 'center' },
                { label: 'Phải', value: 'right' }
            ]}
        ]
    },
    { 
        type: 'image', 
        name: 'Hình ảnh đơn', 
        icon: '🖼️',
        fields: [
            { id: 'url', label: 'Đường dẫn ảnh', type: 'image' },
            { id: 'alt', label: 'Mô tả ảnh (Alt)', type: 'text' },
            { id: 'caption', label: 'Chú thích', type: 'text' },
            { id: 'width', label: 'Độ rộng (%)', type: 'number' }
        ]
    },
    {
        type: 'about_hero',
        name: 'About: Hero',
        icon: 'Layout',
        category: 'About Us',
        defaultProps: { title: 'Giới thiệu', description: 'Tổng công ty Kỹ thuật lạnh Việt Nam (VRC)...' },
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'description', label: 'Mô tả', type: 'textarea' }
        ]
    },
    {
        type: 'about_history',
        name: 'About: Lịch sử',
        icon: 'History',
        category: 'About Us',
        defaultProps: {
            title: 'Lịch sử phát triển',
            p1: 'Được thành lập vào năm 2003...',
            p2: 'Từ một đơn vị chuyên về lắp đặt...',
            image: '/lovable-uploads/0bd3c048-8e37-4775-a6bc-0b54ec07edbe.png',
            expYears: '20+',
            expText: 'Năm kinh nghiệm'
        },
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'p1', label: 'Đoạn văn 1', type: 'textarea' },
            { id: 'p2', label: 'Đoạn văn 2', type: 'textarea' },
            { id: 'image', label: 'Hình ảnh', type: 'image' },
            { id: 'expYears', label: 'Số năm KN', type: 'text' },
            { id: 'expText', label: 'Text kinh nghiệm', type: 'text' }
        ]
    },
    {
        type: 'about_vision',
        name: 'About: Tầm nhìn & Sứ mệnh',
        icon: 'Target',
        category: 'About Us',
        defaultProps: {
            visionTitle: 'Tầm nhìn',
            missionTitle: 'Sứ mệnh'
        },
        fields: [
            { id: 'visionTitle', label: 'Tiêu đề Tầm nhìn', type: 'text' },
            { id: 'missionTitle', label: 'Tiêu đề Sứ mệnh', type: 'text' }
        ]
    },
    {
        type: 'about_values',
        name: 'About: Giá trị cốt lõi',
        icon: 'ShieldCheck',
        category: 'About Us',
        defaultProps: { title: 'Giá trị cốt lõi' },
        fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
    },
    {
        type: 'about_leadership',
        name: 'About: Lãnh đạo',
        icon: 'Users',
        category: 'About Us',
        defaultProps: { title: 'Đội ngũ lãnh đạo' },
        fields: [{ id: 'title', label: 'Tiêu đề', type: 'text' }]
    },
    { 
        type: 'rich_text', 
        name: 'Nội dung văn bản', 
        icon: '📝',
        fields: [
            { id: 'content', label: 'Nội dung', type: 'rich-text' }
        ]
    },
    { 
        type: 'grid', 
        name: 'Lưới Layout', 
        icon: '⊞',
        fields: [
            { id: 'columns', label: 'Số cột', type: 'number' },
            { id: 'gap', label: 'Khoảng cách', type: 'number' },
            { id: 'padding', label: 'Lề (Padding)', type: 'select', options: [
                { label: 'Nhỏ', value: 'small' },
                { label: 'Vừa', value: 'medium' },
                { label: 'Lớn', value: 'large' }
            ]}
        ]
    },
    { 
        type: 'cards', 
        name: 'Danh sách Card', 
        icon: '🎴',
        fields: [
            { id: 'title', label: 'Tiêu đề lưới card', type: 'text' },
            { id: 'image_url', label: 'Ảnh mặc định', type: 'image' },
            { id: 'columns', label: 'Số cột hiển thị', type: 'number' }
        ]
    },
    { 
        type: 'features', 
        name: 'Tính năng', 
        icon: '✨',
        fields: [
            { id: 'title', label: 'Tiêu đề chính', type: 'text' },
            { id: 'subtitle', label: 'Tiêu đề phụ', type: 'textarea' },
            { id: 'icon_image', label: 'Icon/Ảnh minh họa', type: 'image' }
        ]
    },
    {
        type: 'media_section',
        name: 'Media & Content',
        icon: '🖼️',
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'layout', label: 'Bố cục', type: 'select', options: [
                { label: 'Ảnh bên Trái', value: 'image-left' },
                { label: 'Ảnh bên Phải', value: 'image-right' },
                { label: 'Ảnh trên Đầu', value: 'image-top' },
                { label: 'Ảnh dưới Cùng', value: 'image-bottom' }
            ]},
            { id: 'image', label: 'Hình ảnh', type: 'image' },
            { id: 'imageWidth', label: 'Độ rộng ảnh (%)', type: 'number' },
            { id: 'description', label: 'Mô tả', type: 'textarea' }
        ]
    },
    {
        type: 'team_hero',
        name: 'Team: Hero',
        icon: '👥',
        category: 'Team',
        defaultProps: { title: 'Đội ngũ', subtitle: 'Chúng tôi là một tập thể...' },
        fields: [
            { id: 'title', label: 'Tiêu đề', type: 'text' },
            { id: 'subtitle', label: 'Mô tả', type: 'textarea' }
        ]
    },
    {
        type: 'team_grid',
        name: 'Team: Lưới thành viên',
        icon: '⊞',
        category: 'Team',
        defaultProps: { title: 'Đội ngũ nhân sự', description: 'Gặp gỡ những chuyên gia của chúng tôi' },
        fields: [
            { id: 'title', label: 'Tiêu đề lưới', type: 'text' },
            { id: 'description', label: 'Mô tả lưới', type: 'textarea' }
        ]
    },
];


export const BlockLibrary: React.FC = () => {
    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-4 flex-grow overflow-y-auto">
                <Droppable droppableId="blocks-palette" isDropDisabled={true}>
                    {(provided) => (
                        <div 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            className="grid grid-cols-2 gap-2"
                        >
                            {BLOCK_LIBRARY.map((block, index) => (
                                <Draggable key={`block-${block.type}`} draggableId={`block-${block.type}`} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={`flex flex-col items-center justify-center p-2.5 text-center bg-white border border-slate-100 rounded-xl hover:border-primary hover:shadow-md transition-all group cursor-grab active:cursor-grabbing ${
                                                snapshot.isDragging ? 'z-50 shadow-2xl border-primary' : ''
                                            }`}
                                        >
                                            <div className="w-10 h-10 flex items-center justify-center text-xl bg-slate-50 rounded-lg mb-1.5">
                                                {block.icon}
                                            </div>
                                            <span className="text-[10px] font-semibold text-slate-600 truncate w-full">{block.name}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};

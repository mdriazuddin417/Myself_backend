import AddBlogsForm from '@/components/modules/blogs/AddBlogsForm';

const page = () => {
    return (
        <div>
            <AddBlogsForm useCase='create'/>
        </div>
    );
};

export default page;
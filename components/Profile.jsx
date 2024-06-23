import Image from "next/image";
import PromptCard from "./PromptCard";

const Profile = ({ name, image, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
    <span 
    className="flex justify-between">
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}</span>
      </h1>
      <Image
          src={image}
          alt=' '
          width={160}
          height={160}
          className='object-contain rounded-full'/>
    </span>
      
      <p className='desc text-left'>{desc}</p>
      <h1 className='head_text text-left'>
        <span className='orange_gradient text-4xl'>
          {name === "My Profile" ? 
            (data && data.length > 0 ? "Your Prompts" : "You have not created any prompt yet, Create one Now!") :
            (data && data.length > 0 ? `${name}'s Prompts` : `${name} hasn't created any prompt yet!`)
          }</span>
      </h1>
      <div className='mt-10 prompt_layout'>
        {data?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
    <form className='flex flex-col gap-4' >
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <Input
          type='text'
          placeholder='Title'
          required
          id='title'
          className='flex-1 bg-gray-800'
        />
        <Select>
      <SelectTrigger className="w-[180px] bg-gray-800">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Technology</SelectLabel>
          <SelectItem value="apple">JavaScript</SelectItem>
          <SelectItem value="banana">React.js</SelectItem>
          <SelectItem value="blueberry">Next.js</SelectItem>
          <SelectItem value="grapes">Nodejs</SelectItem>
          <SelectItem value="pineapple">MongoDB</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
      <div className='flex gap-4 items-center justify-between'>
      <Input id="picture" type="file" className="dark:bg-gray-800" />
        <Button
          type='button'
        >
            Upload Image
        </Button>
      </div>
     
      <ReactQuill
        theme='snow'
        placeholder='Write something...'
        className='h-72 mb-12 dark:text-whtie'
        required
     
      />
      <Button type='submit' >
        Publish
      </Button>

    </form>
  </div>
  )
}

export default CreatePost

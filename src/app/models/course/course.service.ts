import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./couse.model";

const createCourseIntoDB= async (payload:TCourse)=>{
    const result= await Course.create(payload);
    return result;
}
const getAllCoursesFromDB= async(query:Record<string,unknown>)=>{

    const courseQuery= new QueryBuilder(Course.find().populate('preRequisiteCourses.course'),query)
    .sort()
    .search(courseSearchableFields)
    .paginate()
    .fields()
    .filter()
    const result= await courseQuery.modelQuery;
    return result;
}
const getSingleCourseFromDB= async(id:string)=>{
    const result= await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
}
const deleteCourseFromDB= async(id:string)=>{
    
    const result = await Course.findByIdAndUpdate(
        id,
        {isDeleted:true},
        {new:true}
        
    )
    return result;
  
}

const updateCourseIntoDB= async(Id:string,payload:Partial<TCourse>)=>{

    const {preRequisiteCourses,...courseRemainingData}= payload;

    // step-1:basic Course info update
    const updatedBasicCourseInfo= await Course.findByIdAndUpdate(
        Id,
        courseRemainingData,
        {
            new:true,
            runValidators:true,
        }
    )
    console.log(preRequisiteCourses);

    //check if there is any pre requisite courses to update
    if(preRequisiteCourses && preRequisiteCourses.length>0){
        // filter out the deleted field
        const deletedPreRequisite= preRequisiteCourses.filter((el)=> el.course && el.isDeleted).map((el)=>el.course);
        console.log(deletedPreRequisite);

        const deletedPreRequisiteCourses= await Course.findByIdAndUpdate(
            Id,
            {
                $pull:{preRequisiteCourses :{course:{$in: deletedPreRequisite}}}
            }
        )
    }

    return updatedBasicCourseInfo;

}




export const CourseServices= {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB
}
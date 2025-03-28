const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname: {type:String,required:true},
    lname: {type:String,required:true},
    email: {type:String,required:true, unique:true},
    password: {type:String,required:true},
    NIC: {type:String,required:true,unique:true},
    profile_pic: {type:String},
    contact : {type:String,required:true},
    address : {type:String,required:true},
    role: {type:String,required:true,enum:['Admin','Teacher','CardMarker','Student']}

}); 

const User = mongoose.model('User',UserSchema);

//Admin Schema
const AdminSchema = new mongoose.Schema({
   user_id: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
});

const Admin = mongoose.model('Admin',AdminSchema);

//Teacher Schema
const TeacherSchema = new mongoose.Schema({
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true, unique:true}  
});

const Teacher = mongoose.model('Teacher',TeacherSchema);

//CardMarker Schema
const CardMarkerSchema = new mongoose.Schema({
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
});

const CardMarker = mongoose.model('CardMarker',CardMarkerSchema);

//Grade Schema
const GradeSchema = new mongoose.Schema({
    grade_name: {type:String,required:true}
});

const Grade = mongoose.model('Grade',GradeSchema);

//Subject Schema
const SubjectSchema = new mongoose.Schema({
    subject_name: {type:String,required:true},
});

const Subject = mongoose.model('Subject',SubjectSchema);

//Grade Subject Schema (Mapping Table)
const GradeSubjectSchema = new mongoose.Schema({
    grade_id: {type:mongoose.Schema.Types.ObjectId,ref:'Grade',required:true},
    subject_id: {type:mongoose.Schema.Types.ObjectId,ref:'Subject',required:true},
    teacher_id: {type:mongoose.Schema.Types.ObjectId,ref:'Teacher',required:true},
    student_id: {type:mongoose.Schema.Types.ObjectId,ref:'Student',required:true}
});

const GradeSubject = mongoose.model('GradeSubject',GradeSubjectSchema);

//Attendance Schema
const AttendanceSchema = new mongoose.Schema({
    student_id: {type:mongoose.Schema.Types.ObjectId,ref:'Student',required:true},
    grade_subject_id: {type:mongoose.Schema.Types.ObjectId,ref:'GradeSubject',required:true},
    attendance_date: {type:Date,required:true},
    status: {type:String,required:true,enum:['Present','Absent']},
    reason: {type:String},
    marked_by: {type:mongoose.Schema.Types.ObjectId,ref:'CardMarker',required:true}
});

const Attendance = mongoose.model('Attendance',AttendanceSchema);

//Attendance Report Schema
const AttendanceReportSchema = new mongoose.Schema({
    generated_by: {type:mongoose.Schema.Types.ObjectId,ref:'CardMarker',required:true},
    date: {type:Date,required:true},
    report_type: {type:String,required:true,enum:['Daily','Monthly','Yearly']},
});

const AttendanceReport = mongoose.model('AttendanceReport',AttendanceReportSchema);

//Payment Schema
const PaymentSchema = new mongoose.Schema({
    data: {type:Date,required:true},
    amount: {type:Number,required:true},
    student_id: {type:mongoose.Schema.Types.ObjectId,ref:'Student',required:true},
    grade_id: {type:mongoose.Schema.Types.ObjectId,ref:'Grade',required:true},
    subject_id: {type:mongoose.Schema.Types.ObjectId,ref:'Subject',required:true},
    status: {type:String,required:true,enum:['Paid','Not Paid']}
});

const Payment = mongoose.model('Payment',PaymentSchema);

//Student Schema
const StudentSchema = new mongoose.Schema({
    user_id: {type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
});

const Student = mongoose.model('Student',StudentSchema);

//Export Models
module.exports = {
    User,
    Admin,
    Teacher,
    CardMarker,
    Grade,
    Subject,
    GradeSubject,
    Attendance,
    AttendanceReport,
    Payment,
    Student

};
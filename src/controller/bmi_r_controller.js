import BMI_R from '../model/BMI_R.js';
export const getAllBmi = async (req, res) => {
    try{
        const user = req.user;
        const bmiList = await BMI_R.findAll({where: {userId: user._id}, attributes: ['id', 'tinggi_badan', 'berat_badan','bmi']});
        if( !bmiList.length ){
            res.status(200).json({message: "There's no History of BMI Calculation", status: 'ok'});
        }
        res.send(bmiList);
    }catch(e){
      return
    }
}

export const getBMIById = async (req,res) => {
    try{
    const { id } = req.params;
    if( !id ){
        throw new Error('Cannot Get Single BMI');
    }
    const data = await BMI_R.findOne({where: {id}, attributes: ['tinggi_badan', 'berat_badan']})
    return res.status(200).json({message: 'BMI Retrieved', data});
    }catch(e){
        return res.status(400).json({message : e.message})
    }
        
}
import logger from '../config/logger'
import { drougs } from '../config/index'

const resultOfReport = (sampleDatas) => {
    logger.info('[SAMPLE HELPER] Getting result of report')

    const
        {
            cocaina,
            anfetamina,
            metanfetamina,
            MDA,
            MDMA,
            THC,
            morfina,
            codeina,
            heroina,
            benzoilecgonina,
            cocaetileno,
            norcocaina
        } = sampleDatas

    const cocaineExam = resultCocaine(cocaina, benzoilecgonina, cocaetileno, norcocaina)
    const amphetamineExam = resultOfEachDroug(anfetamina, drougs.amphetamine)
    const methamphetamineExam = resultOfEachDroug(metanfetamina, drougs.methamphetamine)
    const MDAExam = resultOfEachDroug(MDA, drougs.MDA)
    const MDMAExam = resultOfEachDroug(MDMA, drougs.MDMA)
    const THCExam = resultOfEachDroug(THC, drougs.THC)
    const morphineExam = resultOfEachDroug(morfina, drougs.morphine)
    const codeineExam = resultOfEachDroug(codeina, drougs.codeine)
    const heroineExam = resultOfEachDroug(heroina, drougs.heroine)

    if (
        cocaineExam ||
        amphetamineExam ||
        methamphetamineExam ||
        MDAExam ||
        MDMAExam ||
        THCExam ||
        morphineExam ||
        codeineExam ||
        heroineExam
    ) { return 'positivo' }

    return 'negativo'
}

const resultCocaine = (cocaineData, benzoylecgonine, cocaetylene, norcocaine) => {
    logger.info('[SAMPLE HELPER] Getting result from cocaine')

    if ((cocaineData >= drougs.cocaina) && ((benzoylecgonine || cocaetylene || norcocaine) >= 0.05)) {
        return true
    }

    return false
}

const resultOfEachDroug = (drougData, minSubstance) => {
    logger.info(`[SAMPLE HELPER] Getting result from ${drougData}`)

    if (drougData >= minSubstance) return true

    return false
}

export { resultOfReport }

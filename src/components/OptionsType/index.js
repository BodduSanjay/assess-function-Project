import {useState} from 'react'
import QuestionContext from '../../context/QuestionContext'
import OptionItemDefault from '../OptionItemDefault'
import ImageOptionItem from '../ImageOptionItem'

const OptionType = ({optionsType, options, questionId}) => {
  const [initialId, setInitalId] = useState(options[0].id)
  return (
    <QuestionContext.Consumer>
      {value => {
        const {
          togleScore,
          answeredQuestionsList,
          selectedOptionsList,
          addSelectedOpt,
          addAnsQuestion,
        } = value

        console.log(answeredQuestionsList)
        console.log(selectedOptionsList)

        const setId = (id, isCorrect, isSelected, optQuestionId) => {
          const isPresent = answeredQuestionsList.some(each => each.id === id)
          if (!isPresent) {
            addAnsQuestion(optQuestionId)
          }

          if (!isSelected) {
            addSelectedOpt(id, optQuestionId)

            if (isCorrect) {
              togleScore()
            }
          }
        }

        const renderDefault = () => (
          <ul className="ans-options-cont">
            {options.map(each => (
              <OptionItemDefault
                key={each.id}
                each={each}
                setId={setId}
                questionId={questionId}
                selectedOptionsList={selectedOptionsList}
              />
            ))}
          </ul>
        )

        const renderImage = () => (
          <ul className="ans-options-cont">
            {options.map(each => (
              <ImageOptionItem
                key={each.id}
                each={each}
                setId={setId}
                questionId={questionId}
                selectedOptionsList={selectedOptionsList}
              />
            ))}
          </ul>
        )

        const renderSingleSelect = () => {
          const isSelected = selectedOptionsList.some(
            opt => opt.selected === initialId,
          )

          const optionSelected = event => {
            const id = event.target.value
            const selectedOption = options.find(each => each.id === id)
            const isCorrect = selectedOption.is_correct
            const isCorrectBool = isCorrect === 'true'
            setId(id, isCorrectBool, isSelected, questionId)
            setInitalId(id)
          }

          return (
            <div className="select-option-cont">
              <select
                value={initialId}
                onChange={optionSelected}
                className="select-cont"
              >
                {options.map(each => {
                  const updatedData = {
                    id: each.id,
                    text: each.text,
                    isCorrect: each.is_correct,
                  }
                  const {id, text} = updatedData
                  return (
                    <option
                      className={isSelected ? 'option-styled' : 'normal-option'}
                      value={id}
                      key={id}
                    >
                      {text}
                    </option>
                  )
                })}
              </select>
            </div>
          )
        }

        const renderOptions = () => {
          switch (optionsType) {
            case 'DEFAULT':
              return renderDefault()
            case 'IMAGE':
              return renderImage()
            case 'SINGLE_SELECT':
              return renderSingleSelect()
            default:
              return null
          }
        }
        return <>{renderOptions()}</>
      }}
    </QuestionContext.Consumer>
  )
}
export default OptionType

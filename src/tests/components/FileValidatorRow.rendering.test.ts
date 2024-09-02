// directive to instruct vitest to use the jsdom environment:
// @vitest-environment jsdom
// import references to what we need from our test-utils:
import { render, screen } from '../../test-utils'
import { describe, it, expect } from 'vitest'
import { debug } from 'vitest-preview'

// import model references
import type { IFileValidatorItem } from '@builtwithjavascript/file-input-validator'
// import component references:
import FileValidatorRow from '../../components/FileValidatorRow.component.vue'

describe('FileValidatorRow.component: rendering', () => {
  it('renders as expected', () => {
    const props = {
      id: 'unit-test-appearance-1',
      index: 0,
      totItemsCount: 0,
      successClass: 'succes',
      errorClass: 'error',
      roundedCorners: false,
      model: {
        key: 'name',
        name: 'Name',
        value: 'this is a value.csv',
        displayValue: 'This is a value.csv',
        hasError: false,
        iconSuccess: '',
        iconError: ''
      } as IFileValidatorItem
    }

    // render component
    render<typeof FileValidatorRow>(FileValidatorRow, {
      props
    })

    debug()

    // get element reference by testid
    const element = screen.getByTestId(props.id)

    // test
    expect(element).not.toBeNull()
    //expect(element.innerHTML).toContain('This is a value.csv')
    expect(element.innerHTML).toEqual(
      '<span class="property-name flex-none w-20">Name</span><span class="property-value flex-initial overflow-hidden overflow-ellipsis whitespace-nowrap">This is a value.csv</span>'
    )
  })
})

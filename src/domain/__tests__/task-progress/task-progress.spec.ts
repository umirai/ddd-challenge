import { TaskProgressVO } from "src/domain/task-progress/task-progress-vo"
import { TaskStatusVO, TaskStatusId } from "src/domain/task-progress/task-status-vo"

describe('domain/task-progress', () => {
  describe('task-progress-vo.ts', () => {
    const defaultStatus = 'Default'
    const props = {
      userId: '1',
      taskId: '1',
      status: new TaskStatusVO(defaultStatus)
    }
    const taskProgressVO = new TaskProgressVO(props)

    it('task-progres-voを生成', () => {
      expect(taskProgressVO).toBeInstanceOf(TaskProgressVO)
    })

    it('get status()', () => {
      expect(taskProgressVO.status).toBe(defaultStatus)
    })

    it('get statusId()', () => {
      expect(taskProgressVO.statusId).toBe(TaskStatusId[defaultStatus])
    })

    it('get allProps()', () => {
      expect(taskProgressVO.allProps).toMatchObject({
        userId: props.userId,
        taskId: props.taskId,
        status: props.status.value
      })
    })

    it('isDone()', () => {
      expect(taskProgressVO.isDone()).toBeFalsy()
    })
  })

  describe('task-status-vo.ts', () => {
    const props = 'Default'
    const taskStatusVO = new TaskStatusVO(props)

    it('task-progres-voを生成', () => {
      expect(taskStatusVO).toBeInstanceOf(TaskStatusVO)
    })

    it('get value()', () => {
      expect(taskStatusVO.value).toBe(props)
    })

    it('get statusId()', () => {
      expect(taskStatusVO.statusId).toBe(TaskStatusId[props])
    })
  })
})

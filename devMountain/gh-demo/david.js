function getStartTime(schedules, duration) {

    let minutes = duration % 60
    let hours = (duration - minutes) / 60
    let length = `${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}`
    
    
    function meetingMatch(mtgArrS, length, time, index) {
      console.log('meetingMatch', mtgArrS, length, time, index)
    
      function nextTime(length, time, mtgArr, end='19:00', start='09:00') {
        console.log('nextTime', length, time, mtgArr)
        let currentStart = time
        const before = (t1, t2) => {
          if (+t1.slice(0,2) < +t2.slice(0,2)) {
            return true
          } else if (+t1.slice(0,2) > +t2.slice(0,2)) {
            return false
          } else if (+t1.slice(3,5) < +t2.slice(3,5)) {
            return true
          } else {
            return false
          }
        }
        const tPlus = (t, length) => {
          let hours = +t.slice(0,2) + +length.slice(0,2)
          let minutes = +t.slice(3,5) + +length.slice(3,5)
          if (minutes >= 60) {
            minutes -= 60
            hours ++
          }
    
          return `${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}`
        }
        let currentEnd = tPlus(currentStart, length)
    
        if (before(time, start)) {
          currentStart = start
          currentEnd = tPlus(currentStart, length)
        }
        for (let i=0; i<mtgArr.length; i++) {
          if (before(mtgArr[i][0], currentEnd)) {
            if (before(currentStart, mtgArr[i][1])) {
              currentStart = mtgArr[i][1]
              currentEnd = tPlus(currentStart, length)
            }
          } else {
            return currentStart
          }
        }
        return before(end, currentEnd) ? null : currentStart
    
      }
    
      
      let T1 = nextTime(length, time, mtgArrS[index])
      if (!T1) {
        console.log('nextTime returning ', T1)
        return T1
      }
      if (mtgArrS.length-1 === index) {
        console.log('nextTime returning', T1)
        return T1
      }
      let T2 = null
      while (T1!==T2) {
        T2 = meetingMatch(mtgArrS, length, T1, index+1)
        T1 = nextTime(length, T2, mtgArrS[index])
        if (!T1) {
          console.log('nextTime returning ', T1)
          return T1
        }
      }
      console.log('nextTime returning ',T1)
      return T1
    }
  
    let result = meetingMatch(schedules, length, '09:00', 0)
    console.log('nextTime returning ', result)
    return result
    
  }
  
  var schedules = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
  ];
  
  
  // console.log(getStartTime(schedules, 60))
  console.log(getStartTime(schedules, 90))
  
  
  const schedule = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
  ];
  const meetingDuration = 60;
  
  console.log(getStartTime(schedule, meetingDuration))

  
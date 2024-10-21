```json
{
  "game_insights": [
    {
      "id": "1d4ddiedc",
      "game_time": 432,
      "video_time": 2345.3,
      "type": "substitution",
      "quarter": 3,
      "details": {
        "text": "对方外线后卫球员（5 号 胡明轩）移动速度/体能下降，上 3 号增加突破得分及外线三分投射。",
        "key_players": [{
          "jersey_number": 5,
          "name": "胡明轩",
          "tag": "移动速度/体能下降"
        },
        {
          "jersey_number": 5,
          "name": "胡轩",
          "tag": "体能充足"
        }]
      }
    },
    {
      "id": "1dsa4cdiedc",
      "game_time": 522,
      "video_time": 2847.3,
      "type": "tactical_advice",
      "quarter": 3,
      "details": {
        "text": "对方风险球员 内线出手困难，寻求外线出手。根据历史数据，可适当放投。",
        "key_players":[]
      }
    }
  ]
}
```
## Structure Ideas
- Game Insights
    - substitution / 换人
    - tactical_advice / 战术建议
- Game Info
    - Home
    - Away
- game_time: How much time has passed

### Game Info
```json
{
  "game_info": {
    "id": "werh78weru",
    "game_id": "kwerujiwejr",
    "home_team": {
      "name": "Team A",
      "score": 25,
      "turnovers": 12
    },
    "away_team": {
      "name": "Team B",
      "score": 29,
      "turnovers": 15
    },
    "game_date": "2024-10-20",
    "venue": "Arena Name, City",
    "status": "Ongoing", 
    "game_time": 1739,
    "quarter": 3,  
    "time_left_in_quarter": "03:24",
    "possession": "away"
  }
}
```
- id: event id, request many times in one game
- game_id: unique for each game
- status
    - Ongoing
    - Pause
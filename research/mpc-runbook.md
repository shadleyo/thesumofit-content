# SARB MPC reaction video: 19 Nov 2026 (decision ~15:00 SAST)
1. Confirm the decision from SARB / news (repo before: 7.25%, prime 10.75%). Check the move size (bps).
2. python3 calc/mpc.py <hold|cut|hike> [bps]       # writes scripts/MPC.txt + src/mpc.data.json
3. python3 calc/voice.py MPC onwK4e9ZLuTAKqWW03F9 && python3 calc/timing.py MPC
4. ./render-sum.sh MPC   (~3 min)  -> check out/sum/MPC-thumb.jpg; stage to /mnt/user-data/uploads/MoneyInData/TheSumOfIt/MPC.mp4 + MPC-thumbnail.jpg
5. Upload same day: YT (now, or 17:00; playlist "Money in South Africa"), TikTok (immediately), IG reel via Business Suite (immediately, "Share now"). Figures only, no commentary on the decision, "Illustration, not advice".
Title ideas: hold: "SARB holds the repo rate at 7.25%: what it means for your bond" / cut: "SARB cuts rates: your R1.5m bond drops R252 a month" / hike: "SARB hikes: your R1.5m bond now costs R255 more a month".
Caption: Repo X%, prime Y%. R1.5m bond over 20 years: RZ a month, (+/-)R. Illustration, not advice. #sarb #interestrates #southafrica #bond

# train_model.py

import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
import pickle

# Sample data (replace with actual workout data)
data = [
    {"workout": "Push-ups", "muscle_group": "Chest", "sets": 3, "reps": 15},
    {"workout": "Squats", "muscle_group": "Legs", "sets": 3, "reps": 20},
    {"workout": "Pull-ups", "muscle_group": "Back", "sets": 3, "reps": 10},
    # Add more workout data
]

# Preprocess data
workouts = [d['workout'] for d in data]
muscle_groups = [d['muscle_group'] for d in data]
sets = [d['sets'] for d in data]
reps = [d['reps'] for d in data]

# Encode categorical labels
le_workout = LabelEncoder()
workouts_encoded = le_workout.fit_transform(workouts)

le_muscle_group = LabelEncoder()
muscle_groups_encoded = le_muscle_group.fit_transform(muscle_groups)

X = torch.tensor(list(zip(muscle_groups_encoded, sets, reps)), dtype=torch.float32)
y = torch.tensor(workouts_encoded, dtype=torch.long)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the model
class WorkoutPredictor(nn.Module):
    def __init__(self):
        super(WorkoutPredictor, self).__init__()
        self.fc1 = nn.Linear(3, 50)
        self.fc2 = nn.Linear(50, 50)
        self.fc3 = nn.Linear(50, len(le_workout.classes_))

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = WorkoutPredictor()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Train the model
num_epochs = 100
for epoch in range(num_epochs):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()
    if (epoch+1) % 10 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

# Save the model and encoders
torch.save(model.state_dict(), 'model.pth')
with open('le_workout.pkl', 'wb') as f:
    pickle.dump(le_workout, f)
with open('le_muscle_group.pkl', 'wb') as f:
    pickle.dump(le_muscle_group, f)

print("Model and encoders saved.")

import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CollabService } from 'src/app/core/services/collab.service';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.scss',
})
export class JoinRoomComponent {
  roomName = '';
  userName = '';
  joinRoomForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  collabService = inject(CollabService);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.joinRoomForm = this.fb.group({
      roomName: ['', Validators.required],
      userName: ['', Validators.required],
    });
  }

  joinRoom() {
    const { roomName, userName } = this.joinRoomForm.value;
    this.collabService.setRoomName(this.joinRoomForm.value.roomName);
    this.collabService.setUserName(this.joinRoomForm.value.userName);
    console.log('Room Name:', this.collabService.getRoomName());
    this.joinRoomForm.reset();
    this.collabService
      .joinRoom(userName, roomName)
      .then(() => {
        console.log('Joined room');
        this.router.navigate(['/home']);
      })
      .catch((err) => {});
  }
}

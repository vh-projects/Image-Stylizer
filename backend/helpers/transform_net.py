# transform_net.py
import torch
import torch.nn as nn

class TransformerNet(nn.Module):
    def __init__(self):
        super().__init__()
        # Convolutions (no downsampling)
        self.conv1 = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=9, stride=1, padding=4),
            nn.InstanceNorm2d(32, affine=True),
            nn.ReLU(inplace=True)
        )
        self.conv2 = nn.Sequential(
            nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1),
            nn.InstanceNorm2d(64, affine=True),
            nn.ReLU(inplace=True)
        )
        self.conv3 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1),
            nn.InstanceNorm2d(128, affine=True),
            nn.ReLU(inplace=True)
        )

        # Residual blocks
        self.res_blocks = nn.Sequential(*[ResidualBlock(128) for _ in range(5)])

        # Decoder / output (NO spatial upsampling — keeps same HxW)
        self.deconv1 = nn.Sequential(
            nn.Conv2d(128, 64, 3, stride=1, padding=1),
            nn.InstanceNorm2d(64, affine=True),
            nn.ReLU(inplace=True)
        )
        self.deconv2 = nn.Sequential(
            nn.Conv2d(64, 32, 3, stride=1, padding=1),
            nn.InstanceNorm2d(32, affine=True),
            nn.ReLU(inplace=True)
        )
        self.deconv3 = nn.Conv2d(32, 3, 9, stride=1, padding=4)

    def forward(self, x):
        y = self.conv1(x)
        y = self.conv2(y)
        y = self.conv3(y)
        y = self.res_blocks(y)
        y = self.deconv1(y)
        y = self.deconv2(y)
        y = self.deconv3(y)
        # use tanh->scale to [0,1] (keeps stable training range)
        return torch.tanh(y) * 0.5 + 0.5

class ResidualBlock(nn.Module):
    def __init__(self, ch):
        super().__init__()
        self.block = nn.Sequential(
            nn.Conv2d(ch, ch, 3, stride=1, padding=1),
            nn.InstanceNorm2d(ch, affine=True),
            nn.ReLU(inplace=True),
            nn.Conv2d(ch, ch, 3, stride=1, padding=1),
            nn.InstanceNorm2d(ch, affine=True)
        )
    def forward(self, x):
        return x + self.block(x)

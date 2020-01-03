<template>
  <el-container>
    <el-col>
      <el-card>
        <el-row>
          <h1>Your Recommendation</h1>
          <p>
            Based on your answers, these are top 3 areas we recommend you work
            on. <br />
            We have elected the best activites and articles for eah one
          </p>
        </el-row>
        <el-row :direction="horizontal">
          <el-col :span="8">
            <el-card shadow="hover">
              <i class="el-icon-star-off"></i>
              <h1>Dream</h1>
              <p>
                Chief Techology Officer
              </p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <i class="el-icon-star-off"></i>
              <h1>Dream</h1>
              <p>
                Chief Techology Officer
              </p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover">
              <i class="el-icon-star-off"></i>
              <h1>Dream</h1>
              <p>
                Chief Techology Officer
              </p>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-container>
</template>
